import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthSinginDto } from './dto/auth-singin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  createUser = async (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> => {
    try {
      const { password, username } = authCredentialsDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = this.create({
        password: hashedPassword,
        username,
      });

      await this.save(newUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  };

  signIn = async (
    authSinginDto: AuthSinginDto,
    jwtService: JwtService,
  ): Promise<{ accessToken: string }> => {
    const { username, password } = authSinginDto;

    const user = await this.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await jwtService.sign(payload);

      return { accessToken };
    }

    throw new UnauthorizedException('please check login credentials');
  };
}
