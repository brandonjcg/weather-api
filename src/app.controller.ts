import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppDto } from './app.dto';

const RESOURCE_NAME = 'app';

@Controller()
@ApiTags(RESOURCE_NAME)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The application is running',
    type: AppDto,
  })
  checkHealth(): AppDto {
    return this.appService.checkHealth();
  }
}
