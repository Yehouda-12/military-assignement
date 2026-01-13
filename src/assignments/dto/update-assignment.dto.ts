import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAssignmentDto {
  @IsOptional()
  @IsNumber()
  soldierId?: number;

  @IsOptional()
  @IsNumber()
  shiftId?: number;

  @IsOptional()
  @IsString()
  task?: string;
}
