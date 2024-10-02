import { InvalidConnectorSourceError } from '@domain/contact/errors/invalid-connector-source-error';
import { RequiredInformationError } from '@domain/contact/errors/required-information-error';
import { ConnectorAccess } from '@domain/contact/value-objects/connector-access';
import { ConnectorAccessFactory } from '@domain/contact/value-objects/connector-access/factory';
import { Entity } from '@domain/shared-kernel/entity';

export enum ConnectorSource {
  HUBSPOT = 'HUBSPOT',
  GSHEET = 'GSHEET',
}

export type ConnectorInputDto = {
  id: string;
  source: string;
  ownerId: string;
  accessInformations: Record<string, string | number>;
};

export class Connector implements Entity<string> {
  constructor(
    readonly id: string,
    readonly ownerId: string,
    readonly source: ConnectorSource,
    readonly access: ConnectorAccess
  ) {}

  public static from(input: ConnectorInputDto) {
    if (input.id.trim().length === 0) {
      throw new RequiredInformationError('connector.id');
    }

    if (input.ownerId.trim().length === 0) {
      throw new RequiredInformationError('connector.ownerId');
    }

    if (input.source.trim().length === 0) {
      throw new RequiredInformationError('connector.source');
    }

    const validSources = Object.values(ConnectorSource) as string[];
    if (!validSources.includes(input.source)) {
      throw new InvalidConnectorSourceError(input.source);
    }

    return new Connector(
      input.id,
      input.ownerId,
      input.source as ConnectorSource,
      ConnectorAccessFactory.createFrom(input.source as ConnectorSource, input.accessInformations)
    );
  }
}
