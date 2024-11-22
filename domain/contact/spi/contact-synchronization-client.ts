import { Contact } from '@domain/contact/entities';
import { Connector } from '@domain/contact/entities/connector';

export const CONTACT_SYNCHRONIZATION_CLIENT_TYPE = Symbol.for('ContactSynchronizationClient');

export interface ContactSynchronizationClient {
  synchronize(connector: Connector): Promise<Contact[]>;
}
