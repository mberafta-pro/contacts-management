import { Connector, ConnectorSource } from '@domain/contact/entities/connector';
import { ContactSynchronizationClient } from '@domain/contact/spi/contact-synchronization-client';
import { ContactSynchronizationClientFactory } from '@domain/contact/spi/contact-synchronization-client-factory';
import { HubspotContactClient } from '@infrastructure/external/adapters/hubspot-contact-client';
import { HTTP_CLIENT_TYPE, HttpClient } from '@infrastructure/external/httpclient';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ExternalContactClientFactory implements ContactSynchronizationClientFactory {
  constructor(@inject(HTTP_CLIENT_TYPE) private readonly httpClient: HttpClient) {}

  getClientFrom(connector: Connector): ContactSynchronizationClient {
    if (connector.source === ConnectorSource.HUBSPOT) {
      return new HubspotContactClient(this.httpClient);
    }

    throw new Error(`Client ${connector.source} is not supported yet`);
  }
}
