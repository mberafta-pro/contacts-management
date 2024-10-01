import { Entity } from '@domain/shared-kernel/entity';
import { RequiredInformationError } from '@domain/user-account/errors/required-information-error';
import { Password } from '@domain/user-account/password';

export type UserInputDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export class User implements Entity<string> {
  private constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: Password
  ) {}

  withPassword(hash: string, salt: string) {
    return new User(this.id, this.firstName, this.lastName, this.email, Password.from(hash, salt));
  }

  public static from(input: UserInputDto) {
    if (input.id.trim().length === 0) {
      throw new RequiredInformationError('User.id');
    }

    if (input.firstName.trim().length === 0) {
      throw new RequiredInformationError('User.firstName');
    }

    if (input.lastName.trim().length === 0) {
      throw new RequiredInformationError('User.lastName');
    }

    if (input.email.trim().length === 0) {
      throw new RequiredInformationError('User.email');
    }

    return new User(input.id, input.firstName, input.lastName, input.email, Password.empty);
  }
}
