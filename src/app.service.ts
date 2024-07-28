import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth() {
    return {
      message: 'App is running 🚀',
      error: false,
    };
  }
}
