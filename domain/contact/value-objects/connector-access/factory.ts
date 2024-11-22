import { ConnectorSource } from '@domain/contact/entities/connector';
import { UnhandledConnectorAccessCreationStrategyError } from '@domain/contact/errors/unhandled-connector-access-creation-strategy';
import { GsheetAccessCreationStrategy } from '@domain/contact/value-objects/connector-access/gsheet/strategy';
import { HubspotAccessCreationStrategy } from '@domain/contact/value-objects/connector-access/hubspot/strategy';
import { TypesMapping } from '@domain/contact/value-objects/connector-access/types-mapping';

export class ConnectorAccessFactory {
  private static readonly strategies = [
    new HubspotAccessCreationStrategy(),
    new GsheetAccessCreationStrategy(),
  ];

  static createFrom<T extends ConnectorSource>(
    source: T,
    accessInformations: Record<string, string | number>
  ): TypesMapping[T] {
    const strategy = this.strategies.find((strategy) => strategy.canHandle(source));
    if (!strategy) {
      throw new UnhandledConnectorAccessCreationStrategyError(source);
    }

    return strategy?.create(accessInformations) as unknown as TypesMapping[T];
  }
}
