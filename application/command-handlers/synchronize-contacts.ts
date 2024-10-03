import {
  SynchronizeContactsCommand,
  SynchronizeContactsUsecase,
} from '@domain/contact/api/synchronize-contacts';
import { ConnectorNotFoundError } from '@domain/contact/errors/connector-not-found-error';
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
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class SynchronizeContacts implements SynchronizeContactsUsecase {
  constructor(
    @inject(CONTACT_SYNCHRONIZATION_CLIENT_FACTORY_TYPE)
    private readonly clientFactory: ContactSynchronizationClientFactory,
    @inject(CONNECTOR_REPOSITORY_TYPE) private readonly connectorRepository: ConnectorRepository,
    @inject(CONTACT_REPOSITORY_TYPE) private readonly contactRepository: ContactRepository,
    @inject(CONNECTOR_ACCESS_ENCRYPTER_TYPE) private readonly encrypter: ConnectorAccessEncrypter
  ) {}

  async handle(command: SynchronizeContactsCommand): Promise<string | void> {
    const connector = await this.connectorRepository.getById(command.connectorId);
    if (!connector) {
      throw new ConnectorNotFoundError(command.connectorId);
    }

    const client = this.clientFactory.getClientFrom(connector);
    const contacts = await client.synchronize(connector.decryptWith(this.encrypter));

    await Promise.all(
      contacts.map(async (contact) => {
        await this.contactRepository.create(contact);
      })
    );
  }
}
