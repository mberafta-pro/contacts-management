import { InvalidPasswordError } from '@domain/user-account/errors/invalid-password-error';
import { InvalidPasswordLengthError } from '@domain/user-account/errors/invalid-password-length-error';
import { RequiredInformationError } from '@domain/user-account/errors/required-information-error';
import { Password } from '@domain/user-account/password';
import { genSalt, hash } from 'bcryptjs';
import { injectable } from 'inversify';
import 'reflect-metadata';

export const PASSWORD_SERVICE_TYPE = Symbol.for('PasswordService');

@injectable()
export class PasswordService {
  private readonly iterations = 10;
  private readonly minLength = 3;

  private async generateSalt() {
    return await genSalt(this.iterations);
  }

  private async generateHash(password: string, salt: string) {
    return await hash(password, salt);
  }

  async generateFrom(password: string): Promise<Password> {
    if (password.trim().length === 0) {
      throw new RequiredInformationError('password');
    }

    if (password.trim().length < this.minLength) {
      throw new InvalidPasswordLengthError();
    }

    const salt = await this.generateSalt();
    const hash = await this.generateHash(password, salt);
    return Password.from(hash, salt);
  }

  async verifyPassword(password: string, storedPassword: Password) {
    const hashedPassword = await this.generateHash(password, storedPassword.salt);
    if (hashedPassword !== storedPassword.hash) {
      throw new InvalidPasswordError();
    }
  }
}
