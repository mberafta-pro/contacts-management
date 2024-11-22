import { Connector } from '@domain/contact/entities/connector';

export const CONNECTOR_REPOSITORY_TYPE = Symbol.for('ConnectorRepository');

export interface ConnectorRepository {
  create(connector: Connector): Promise<string>;
  getById(connectorId: string): Promise<Connector | null>;
  newId(): string;
}
