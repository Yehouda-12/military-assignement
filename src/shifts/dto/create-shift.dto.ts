import { IsDateString, IsString } from 'class-validator';

export class CreateShiftDto {
  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsString()
  location: string;
}
