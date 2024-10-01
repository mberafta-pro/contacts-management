import { Login } from '@application/command-handlers/login';
import { Signup } from '@application/command-handlers/signup';
import { LOGIN_USECASE_TYPE, LoginUsecase } from '@domain/user-account/api/login-usecase';
import { SIGNUP_USECASE_TYPE, SignupUsecase } from '@domain/user-account/api/signup-usecase';
import { TOKEN_MANAGER_TYPE } from '@domain/user-account/ports/token-manager';
import { USER_REPOSITORY_TYPE } from '@domain/user-account/ports/user-repository';
import {
  PASSWORD_SERVICE_TYPE,
  PasswordService,
} from '@domain/user-account/services/password-service';
import { JsonWebTokenManager } from '@infrastructure/external/adapters/json-web-token-manager';
import { PostgresUserRepository } from '@infrastructure/persistence/postgres/adapters/user-repository';
import { ApiController } from '@infrastructure/presentation/express/controllers';
import {
  USERS_CONTROLLER_TYPE,
  UsersController,
} from '@infrastructure/presentation/express/controllers/user-controller';
import { IoCModuleDefinition } from '@ioc/index';
import { ContainerModule, interfaces } from 'inversify';

export const userModule: IoCModuleDefinition<ContainerModule> = {
  adapters: new ContainerModule((bind: interfaces.Bind) => {
    bind(USER_REPOSITORY_TYPE).to(PostgresUserRepository);
    bind(TOKEN_MANAGER_TYPE).to(JsonWebTokenManager);
  }),
  controllers: new ContainerModule((bind: interfaces.Bind) => {
    bind<ApiController>(USERS_CONTROLLER_TYPE).to(UsersController);
  }),
  usecases: new ContainerModule((bind: interfaces.Bind) => {
    bind<LoginUsecase>(LOGIN_USECASE_TYPE).to(Login);
    bind<SignupUsecase>(SIGNUP_USECASE_TYPE).to(Signup);
  }),
  domainServices: new ContainerModule((bind: interfaces.Bind) => {
    bind(PASSWORD_SERVICE_TYPE).to(PasswordService);
  }),
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  constants: new ContainerModule((bind: interfaces.Bind) => {}),
};
