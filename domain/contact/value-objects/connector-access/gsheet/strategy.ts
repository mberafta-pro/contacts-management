import { ConnectorSource } from '@domain/contact/entities/connector';
import { ConnectorAccessCreationStrategy } from '@domain/contact/value-objects/connector-access/creation-strategy';
import { GsheetAccess } from '@domain/contact/value-objects/connector-access/gsheet';

export class GsheetAccessCreationStrategy
  implements ConnectorAccessCreationStrategy<ConnectorSource.GSHEET>
{
  canHandle(source: ConnectorSource): boolean {
    return source === ConnectorSource.GSHEET;
  }

  create(input: Record<string, string | number>): GsheetAccess {
    return new GsheetAccess(
      input.accountEmail?.toString() ?? '',
      input.privateKey?.toString() ?? ''
    );
  }
}
