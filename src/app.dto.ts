import { ApiProperty } from '@nestjs/swagger';

export class AppDto {
  @ApiProperty({
    description: 'The message of the application',
    example: 'App is running 🚀',
  })
  message: string;

  @ApiProperty({
    description: 'Indicates if there is an error',
    example: false,
  })
  error: boolean;
}
