import { CommandHandler } from '@application/command-handlers';
import { LoginCommand } from '@application/commands/login-command';
import { UserNotFoundError } from '@domain/errors/user-not-found-error';
import { TOKEN_MANAGER_TYPE, TokenManager } from '@domain/user-account/ports/token-manager';
import { USER_REPOSITORY_TYPE, UserRepository } from '@domain/user-account/ports/user-repository';
import {
  PASSWORD_SERVICE_TYPE,
  PasswordService,
} from '@domain/user-account/services/password-service';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

export const LOGIN_TYPE = Symbol.for('Login');

@injectable()
export class Login implements CommandHandler<LoginCommand, string> {
  public constructor(
    @inject(USER_REPOSITORY_TYPE) private readonly userRepository: UserRepository,
    @inject(PASSWORD_SERVICE_TYPE) private readonly passwordService: PasswordService,
    @inject(TOKEN_MANAGER_TYPE) private readonly tokenManager: TokenManager
  ) {}

  async handle(command: LoginCommand): Promise<string> {
    const user = await this.userRepository.findByEmail(command.email);
    if (user == null) {
      throw new UserNotFoundError(command.email);
    }

    await this.passwordService.verifyPassword(command.password, user.password);
    const token = await this.tokenManager.generateFrom(user);
    return token;
  }
}
