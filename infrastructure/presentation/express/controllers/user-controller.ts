import { Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { ApiController } from './index';

export const USERS_PATH = '/users';
export const USERS_CONTROLLER_TYPE = Symbol.for('UsersController');

@injectable()
export class UsersController extends ApiController {
  router: Router = Router();

  constructor() {
    super('/users');
    this.router = Router();
    this.configureRoutes();
  }

  configureRoutes() {}
}
