import { IsNotEmpty, IsString } from 'class-validator';

export class AuthSinginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
