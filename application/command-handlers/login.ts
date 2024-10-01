import { LoginCommand, LoginUsecase } from '@domain/user-account/api/login-usecase';
import { UserNotFoundError } from '@domain/user-account/errors/user-not-found-error';
import { TOKEN_MANAGER_TYPE, TokenManager } from '@domain/user-account/spi/token-manager';
import { USER_REPOSITORY_TYPE, UserRepository } from '@domain/user-account/spi/user-repository';
import {
  PASSWORD_SERVICE_TYPE,
  PasswordService,
} from '@domain/user-account/services/password-service';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class Login implements LoginUsecase {
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
