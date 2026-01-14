import { IsNumber, IsOptional } from "class-validator";

export class UpdateAssignmentDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  shiftId?: number;
}
