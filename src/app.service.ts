import { Injectable } from '@nestjs/common';
import { AppDto } from './app.dto';

@Injectable()
export class AppService {
  checkHealth(): AppDto {
    return {
      message: 'App is running 🚀',
      error: false,
    };
  }
}
