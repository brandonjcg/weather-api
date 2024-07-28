import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getAllWeatherData() {
    return await this.weatherService.getAllWeatherData();
  }

  @Get()
  async getWeatherDataByLocation(@Query() location: string) {
    return await this.weatherService.getDataByLocation(location);
  }

  @Get('logs')
  async getLogs() {
    return await this.weatherService.getLogs();
  }
}
