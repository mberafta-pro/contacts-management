import { UserRepository } from '@domain/user-account/ports/user-repository';
import { User } from '@domain/user-account/user';
import userModel from '@infrastructure/persistence/postgres/models/user';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class PostgresUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    await userModel.create({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      passwordHash: user.password.hash,
      passwordSalt: user.password.salt,
      email: user.email,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await userModel.findOne({ where: { email } });
    if (!user) return null;

    return User.from({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }).withPassword(user.passwordHash, user.passwordSalt);
  }
}
