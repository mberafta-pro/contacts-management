import { SignupCommand, SignupUsecase } from '@domain/user-account/api/signup-usecase';
import { AlreadyExistingEmailError } from '@domain/user-account/errors/already-existing-email-error';
import { USER_REPOSITORY_TYPE, UserRepository } from '@domain/user-account/ports/user-repository';
import {
  PASSWORD_SERVICE_TYPE,
  PasswordService,
} from '@domain/user-account/services/password-service';
import { User } from '@domain/user-account/user';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class Signup implements SignupUsecase {
  constructor(
    @inject(USER_REPOSITORY_TYPE) private readonly userRepository: UserRepository,
    @inject(PASSWORD_SERVICE_TYPE) private readonly passwordService: PasswordService
  ) {}

  async handle(command: SignupCommand): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new AlreadyExistingEmailError(command.email);
    }

    const newUser = User.from({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      id: this.userRepository.newId(),
    });

    const password = await this.passwordService.generateFrom(command.password);

    await this.userRepository.create(newUser.withPassword(password.hash, password.salt));
  }
}
