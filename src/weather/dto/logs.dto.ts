import { ApiProperty } from '@nestjs/swagger';

export class LogDto {
  @ApiProperty({
    example: 'API fetch failed',
    description: 'The log message',
  })
  message: string;

  @ApiProperty({
    example: '2023-04-01T12:00:00.000Z',
    description: 'Timestamp of the log',
  })
  timestamp: string;
}

export class LogsDto {
  @ApiProperty({
    type: [LogDto],
    description: 'Array of log entries',
  })
  logs: LogDto[];
}
