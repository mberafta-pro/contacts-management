import { AddConnectorCommand, AddConnectorUsecase } from '@domain/contact/api/add-connector';
import { Connector } from '@domain/contact/entities/connector';
import {
  CONNECTOR_ACCESS_ENCRYPTER_TYPE,
  ConnectorAccessEncrypter,
} from '@domain/contact/services/connector-access-encrypter';
import {
  CONNECTOR_REPOSITORY_TYPE,
  ConnectorRepository,
} from '@domain/contact/spi/connector-repository';
import { inject, injectable } from 'inversify';

@injectable()
export class AddConnector implements AddConnectorUsecase {
  public constructor(
    @inject(CONNECTOR_REPOSITORY_TYPE) private readonly connectorRepository: ConnectorRepository,
    @inject(CONNECTOR_ACCESS_ENCRYPTER_TYPE) private readonly encrypter: ConnectorAccessEncrypter
  ) {}

  async handle(command: AddConnectorCommand): Promise<void> {
    const connector = Connector.from({
      id: this.connectorRepository.newId(),
      ownerId: command.ownerId,
      source: command.source,
      accessInformations: command.params,
    }).encryptWith(this.encrypter);

    await this.connectorRepository.create(connector);
  }
}
