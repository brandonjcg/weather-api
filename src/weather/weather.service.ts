import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { REDIS_CLIENT_NAME, RedisClient } from '@/redis';
import { QueryDTO, WeatherDTO } from './weather.dto';

const logger = new Logger('WeatherService');

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,

    @Inject(REDIS_CLIENT_NAME)
    private readonly client: RedisClient,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async fetchWeatherData() {
    try {
      if (Math.random() < 0.2)
        return this.saveErrorLog('🔴 The API request failed');

      const endpoint = `${this.getEndpoint()}&q=bulk`;
      const response = await firstValueFrom(
        this.httpService.post<WeatherDTO>(
          endpoint,
          this.buildBodyRequest(this.getCountriesToFetch()),
        ),
      );
      await this.saveInRedis(response.data);
    } catch (error) {
      this.saveErrorLog(`🔴 ${error.message}`);
    }
  }

  getEndpoint() {
    const host = this.configService.get('API_URL_WEATHER');
    const apiKey = this.configService.get('API_KEY_WEATHER');

    return `${host}?key=${apiKey}`;
  }

  getCountriesToFetch() {
    const countriesFromEnv =
      this.configService.get('COUNTRIES_TO_REQUEST') ||
      'Santiago,Zurich,Auckland,Sídney,Londres,Georgia';

    return countriesFromEnv.split(',');
  }

  buildBodyRequest(countries: string[]) {
    return {
      locations: countries.map((country) => ({
        q: country,
      })),
    };
  }

  async saveInRedis(data: WeatherDTO) {
    for (const weather of data.bulk) {
      await this.client.setWithTTL(
        `weather:${this.buildCountryKey(weather.query.location.name)}`,
        JSON.stringify(this.buildDataRequerid(weather.query)),
      );
    }
    logger.log('✅ Weather data saved in Redis');
  }

  buildDataRequerid(data: QueryDTO) {
    return {
      locationName: `${data.location.name} - ${data.location.country}`,
      temperatureCelcius: data.current.temp_c,
      temperatureFahrenheit: data.current.temp_f,
      createdAt: new Date(),
    };
  }

  saveErrorLog(error: string) {
    const errorObject = JSON.stringify({
      message: error,
      createdAt: new Date(),
    });

    this.client.lpush('error', errorObject);

    logger.error(error);
  }

  async getAllWeatherData() {
    const keys = await this.client.keys('weather:*');

    const data = await Promise.all(
      keys.map(async (key) => {
        const value = await this.client.get(key);
        return JSON.parse(value);
      }),
    );

    return data;
  }

  async getDataByLocation(location: string) {
    const key = `weather:${this.buildCountryKey(location)}`;
    const value = await this.client.get(key);

    return JSON.parse(value);
  }

  buildCountryKey(location: string) {
    return location.toLowerCase().replace(/\s/g, '-');
  }

  async getLogs() {
    const values = await this.client.lrange('error', 0, -1);

    return values.map((value) => JSON.parse(value));
  }
}
