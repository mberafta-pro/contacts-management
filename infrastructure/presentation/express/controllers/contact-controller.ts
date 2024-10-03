import { LIST_CONTACTS_USECASE, ListContactsUsecase } from '@domain/contact/api/list-contacts';
import { ApiController } from '@infrastructure/presentation/express/controllers';
import { Router } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

export const CONTACTS_PATH = '/contacts';
export const CONTACTS_CONTROLLER_TYPE = Symbol.for('ContactsController');

@injectable()
export class ContactsController extends ApiController {
  router: Router = Router();

  constructor(@inject(LIST_CONTACTS_USECASE) private readonly listContacts: ListContactsUsecase) {
    super(CONTACTS_PATH);
    this.router = Router();
    this.configureRoutes();
  }

  configureRoutes() {}
}
