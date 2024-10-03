import { AddConnector } from '@application/command-handlers/add-connector';
import { SynchronizeContacts } from '@application/command-handlers/synchronize-contacts';
import { ListContacts } from '@application/query-handlers/list-contacts';
import { ADD_CONNECTOR_USECASE_TYPE, AddConnectorUsecase } from '@domain/contact/api/add-connector';
import { LIST_CONTACTS_USECASE, ListContactsUsecase } from '@domain/contact/api/list-contacts';
import {
  SYNCHRONIZE_CONTACTS_USECASE_TYPE,
  SynchronizeContactsUsecase,
} from '@domain/contact/api/synchronize-contacts';
import {
  CONNECTOR_ACCESS_ENCRYPTER_TYPE,
  ConnectorAccessEncrypter,
} from '@domain/contact/services/connector-access-encrypter';
import {
  CONNECTOR_REPOSITORY_TYPE,
  ConnectorRepository,
} from '@domain/contact/spi/connector-repository';
import { CONTACT_REPOSITORY_TYPE, ContactRepository } from '@domain/contact/spi/contact-repository';
import {
  CONTACT_SYNCHRONIZATION_CLIENT_FACTORY_TYPE,
  ContactSynchronizationClientFactory,
} from '@domain/contact/spi/contact-synchronization-client-factory';
import { ExternalContactClientFactory } from '@infrastructure/external/adapters/external-contact-client-factory';
import { PostgresConnectorRepository } from '@infrastructure/persistence/postgres/adapters/connector-repository';
import { PostgresContactRepository } from '@infrastructure/persistence/postgres/adapters/contact-repository';
import { ApiController } from '@infrastructure/presentation/express/controllers';
import {
  CONNECTORS_CONTROLLER_TYPE,
  ConnectorsController,
} from '@infrastructure/presentation/express/controllers/connector-controller';
import {
  CONTACTS_CONTROLLER_TYPE,
  ContactsController,
} from '@infrastructure/presentation/express/controllers/contact-controller';
import { IoCModuleDefinition } from '@ioc/index';
import { ContainerModule, interfaces } from 'inversify';

export const contactModule: IoCModuleDefinition<ContainerModule> = {
  adapters: new ContainerModule((bind: interfaces.Bind) => {
    bind<ContactRepository>(CONTACT_REPOSITORY_TYPE).to(PostgresContactRepository);
    bind<ConnectorRepository>(CONNECTOR_REPOSITORY_TYPE).to(PostgresConnectorRepository);
    bind<ContactSynchronizationClientFactory>(CONTACT_SYNCHRONIZATION_CLIENT_FACTORY_TYPE).to(
      ExternalContactClientFactory
    );
  }),

  controllers: new ContainerModule((bind: interfaces.Bind) => {
    bind<ApiController>(CONTACTS_CONTROLLER_TYPE).to(ContactsController);
    bind<ApiController>(CONNECTORS_CONTROLLER_TYPE).to(ConnectorsController);
  }),
  usecases: new ContainerModule((bind: interfaces.Bind) => {
    bind<AddConnectorUsecase>(ADD_CONNECTOR_USECASE_TYPE).to(AddConnector);
    bind<SynchronizeContactsUsecase>(SYNCHRONIZE_CONTACTS_USECASE_TYPE).to(SynchronizeContacts);
    bind<ListContactsUsecase>(LIST_CONTACTS_USECASE).to(ListContacts);
  }),

  domainServices: new ContainerModule((bind: interfaces.Bind) => {
    bind<ConnectorAccessEncrypter>(CONNECTOR_ACCESS_ENCRYPTER_TYPE)
      .to(ConnectorAccessEncrypter)
      .inSingletonScope();
  }),
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  constants: new ContainerModule((bind: interfaces.Bind) => {}),
};
