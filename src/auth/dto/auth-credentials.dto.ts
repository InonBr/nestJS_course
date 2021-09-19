import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { MatchPasswords } from '../decorators/matchPasswords.decorator';

export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(MatchPasswords, ['password'])
  passwordConfirm: string;
}
