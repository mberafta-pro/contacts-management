import { ConnectorSource } from '@domain/contact/entities/connector';
import { TypesMapping } from '@domain/contact/value-objects/connector-access/types-mapping';

export interface ConnectorAccessCreationStrategy<T extends ConnectorSource> {
  canHandle(source: T): boolean;
  create(input: Record<string, string | number>): TypesMapping[T];
}
