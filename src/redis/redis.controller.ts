import { Controller, Get, Post } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  async getWeather() {
    return await this.redisService.get('weather');
  }

  @Post()
  async setWeather() {
    return await this.redisService.set('weather', 'sunny');
  }
}
