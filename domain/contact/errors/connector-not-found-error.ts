import { DomainError } from '@domain/shared-kernel/domain-error';

type ConnectorNotFoundContext = { connectorId: string };

export class ConnectorNotFoundError extends DomainError<ConnectorNotFoundContext> {
  constructor(connectorId: string) {
    super('connector.not.found.error', { connectorId });
  }
}
