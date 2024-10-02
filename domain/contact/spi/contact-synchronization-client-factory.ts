import { Connector } from '@domain/contact/entities/connector';
import { ContactSynchronizationClient } from '@domain/contact/spi/contact-synchronization-client';

export const CONTACT_SYNCHRONIZATION_CLIENT_FACTORY_TYPE = Symbol.for(
  'ContactSynchronizationClientFactory'
);

export interface ContactSynchronizationClientFactory {
  getClientFrom(connector: Connector): ContactSynchronizationClient;
}
