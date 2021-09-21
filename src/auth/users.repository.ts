import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  createUser = async (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> => {
    try {
      const { password, username } = authCredentialsDto;

      const newUser = this.create({
        password,
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
}
