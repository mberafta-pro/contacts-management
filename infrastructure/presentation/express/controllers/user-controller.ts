import { FIND_USER_TYPE, FindUser } from '@application/query-handlers/find-user';
import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ApiController } from './index';

export const USERS_PATH = '/users';
export const USERS_CONTROLLER_TYPE = Symbol.for('UsersController');

@injectable()
export class UsersController extends ApiController {
  router: Router = Router();

  constructor(@inject(FIND_USER_TYPE) private readonly findUser: FindUser) {
    super('/users');
    this.router = Router();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/', async (request: Request, response: Response) => {
      console.log('Finally here!');
      response.status(200).end();
    });
  }
}
