import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthSinginDto } from './dto/auth-singin.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  signUp = (authCredentialsDto: AuthCredentialsDto): Promise<void> => {
    return this.usersRepository.createUser(authCredentialsDto);
  };

  signIn = (authSinginDto: AuthSinginDto): Promise<{ accessToken: string }> => {
    return this.usersRepository.signIn(authSinginDto, this.jwtService);
  };
}
