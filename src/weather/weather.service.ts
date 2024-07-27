import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WeatherService {
  @Cron(CronExpression.EVERY_SECOND)
  async fetchWeatherData() {
    try {
      if (Math.random() < 0.2) console.error('🔴 Error fetching weather data');

      console.log('🟢 Fetch successful');
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
}
