import { SynchronizeContacts } from '@application/command-handlers/synchronize-contacts';
import { ADD_CONNECTOR_USECASE_TYPE, AddConnectorUsecase } from '@domain/contact/api/add-connector';
import { SYNCHRONIZE_CONTACTS_USECASE_TYPE } from '@domain/contact/api/synchronize-contacts';
import { ApiController } from '@infrastructure/presentation/express/controllers';
import { addConnectorHandler } from '@infrastructure/presentation/express/handlers/add-connector';
import { addConnectorSchema } from '@infrastructure/presentation/express/handlers/add-connector/schema';
import { synchronizeContactsHandler } from '@infrastructure/presentation/express/handlers/synchronize-contacts';
import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

export const CONNECTORS_PATH = '/connectors';
export const CONNECTORS_CONTROLLER_TYPE = Symbol.for('ConnectorsController');

@injectable()
export class ConnectorsController extends ApiController {
  router: Router = Router();

  constructor(
    @inject(ADD_CONNECTOR_USECASE_TYPE) private readonly addConnector: AddConnectorUsecase,
    @inject(SYNCHRONIZE_CONTACTS_USECASE_TYPE)
    private readonly synchronizeContacts: SynchronizeContacts
  ) {
    super(CONNECTORS_PATH);
    this.router = Router();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.post('/', checkSchema(addConnectorSchema), addConnectorHandler(this.addConnector));
    this.router.post(
      '/:connectorId/synchronize',
      synchronizeContactsHandler(this.synchronizeContacts)
    );
  }
}
