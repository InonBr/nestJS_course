import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPasswords } from '../decorators/matchPasswords.decorator';

export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is too weak',
  // })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(MatchPasswords, ['password'])
  passwordConfirm: string;
}
