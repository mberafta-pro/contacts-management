import { Connector } from '@domain/contact/entities/connector';
import { ConnectorRepository } from '@domain/contact/spi/connector-repository';
import ConnectorModel from '@infrastructure/persistence/postgres/models/connector';
import { injectable } from 'inversify';
import { v4 } from 'uuid';
import 'reflect-metadata';

@injectable()
export class PostgresConnectorRepository implements ConnectorRepository {
  async create(connector: Connector): Promise<string> {
    const createdConnector = await ConnectorModel.create({
      id: connector.id,
      source: connector.source,
      ownerId: connector.ownerId,
      access: connector.access.toJson(),
    });

    return createdConnector.id;
  }

  async getById(connectorId: string): Promise<Connector | null> {
    const connector = await ConnectorModel.findOne({ where: { id: connectorId } });

    if (!connector) return null;
    return Connector.from({
      id: connector.id,
      source: connector.source,
      ownerId: connector.ownerId,
      accessInformations: connector.access,
    });
  }

  newId(): string {
    return v4();
  }
}
