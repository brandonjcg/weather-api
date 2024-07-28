import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogsDto, WeatherDto } from './dto';

const RESOURCE_NAME = 'weather';

@Controller(RESOURCE_NAME)
@ApiTags(RESOURCE_NAME)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Temperatures list for all locations',
    type: [WeatherDto],
  })
  async getAllWeatherData() {
    return await this.weatherService.getAllWeatherData();
  }

  @Get('location/:location')
  @ApiResponse({
    status: 200,
    description: 'Data for a specific location',
    type: WeatherDto,
  })
  async getWeatherDataByLocation(@Param('location') location: string) {
    return await this.weatherService.getDataByLocation(location);
  }

  @Get('logs')
  @ApiResponse({
    status: 200,
    description: 'List of logs',
    type: LogsDto,
  })
  async getLogs() {
    return await this.weatherService.getLogs();
  }
}
