import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  createUser = async (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> => {
    const { password, username } = authCredentialsDto;

    const newUser = this.create({
      password,
      username,
    });

    await this.save(newUser);
  };
}
