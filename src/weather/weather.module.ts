import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  imports: [ScheduleModule.forRoot()],
})
export class WeatherModule {}
