import { IsNumber, IsOptional } from 'class-validator';

export class FilterAssignmentsDto {
  @IsOptional()
  @IsNumber()
  soldierId?: number;

  @IsOptional()
  @IsNumber()
  shiftId?: number;
}
