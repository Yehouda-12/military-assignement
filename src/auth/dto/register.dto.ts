import { IsString, MinLength, IsIn } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  @IsIn(['SOLDIER', 'COMMANDER'])
  role: string;
}
