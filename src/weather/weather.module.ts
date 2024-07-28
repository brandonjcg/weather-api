import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { RedisModule, RedisProvider } from '@/redis';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, RedisProvider],
  imports: [ScheduleModule.forRoot(), HttpModule, RedisModule],
})
export class WeatherModule {}
