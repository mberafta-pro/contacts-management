import { LOGIN_USECASE_TYPE, LoginUsecase } from '@domain/user-account/api/login-usecase';
import { SIGNUP_USECASE_TYPE, SignupUsecase } from '@domain/user-account/api/signup-usecase';
import { ApiController } from '@infrastructure/presentation/express/controllers';
import { loginHandler } from '@infrastructure/presentation/express/handlers/login';
import { loginSchema } from '@infrastructure/presentation/express/handlers/login/schema';
import { signupHandler } from '@infrastructure/presentation/express/handlers/signup';
import { signupSchema } from '@infrastructure/presentation/express/handlers/signup/schema';
import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

export const USERS_PATH = '/users';
export const USERS_CONTROLLER_TYPE = Symbol.for('UsersController');

@injectable()
export class UsersController extends ApiController {
  router: Router = Router();

  constructor(
    @inject(LOGIN_USECASE_TYPE) private readonly login: LoginUsecase,
    @inject(SIGNUP_USECASE_TYPE) private readonly signup: SignupUsecase
  ) {
    super('/users');
    this.router = Router();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.post('/login', checkSchema(loginSchema), loginHandler(this.login));
    this.router.post('/', checkSchema(signupSchema), signupHandler(this.signup));
  }
}
