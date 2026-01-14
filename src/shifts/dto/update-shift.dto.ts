import {  IsOptional, IsString } from "class-validator";


export class UpdateShiftDto {
  @IsOptional()
 
  startTime: string

  @IsOptional()
  
  endTime: string;

  @IsOptional()
 @IsString()
  location: string;
}
