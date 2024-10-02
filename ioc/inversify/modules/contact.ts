import { AddConnector } from '@application/command-handlers/add-connector';
import { ADD_CONNECTOR_USECASE_TYPE, AddConnectorUsecase } from '@domain/contact/api/add-connector';
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
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  controllers: new ContainerModule((bind: interfaces.Bind) => {}),
  usecases: new ContainerModule((bind: interfaces.Bind) => {
    bind<AddConnectorUsecase>(ADD_CONNECTOR_USECASE_TYPE).to(AddConnector);
  }),

  domainServices: new ContainerModule((bind: interfaces.Bind) => {
    bind<ConnectorAccessEncrypter>(CONNECTOR_ACCESS_ENCRYPTER_TYPE)
      .to(ConnectorAccessEncrypter)
      .inSingletonScope();
  }),
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  constants: new ContainerModule((bind: interfaces.Bind) => {}),
};
