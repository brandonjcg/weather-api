import { ApiProperty } from '@nestjs/swagger';

export class WeatherDto {
  @ApiProperty({
    example: 'Tijuana - México',
    description: 'The name of the location',
  })
  locationName: string;

  @ApiProperty({
    example: 7.5,
    description: 'The temperature in celsius',
  })
  temperatureCelcius: number;

  @ApiProperty({
    example: 45.5,
    description: 'The temperature in fahrenheit',
  })
  temperatureFahrenheit: number;

  @ApiProperty({
    example: '2024-07-28T08:50:00.799Z',
    description: 'Timestamp of the log',
  })
  createdAt: string;
}
