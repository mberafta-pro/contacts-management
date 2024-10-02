import { Contact } from '@domain/contact/entities';

export const CONTACT_REPOSITORY_TYPE = Symbol.for('ContactRepository');
export interface ContactRepository {
  create(contact: Contact): Promise<void>;
  getAll(page: number, size: number): Promise<Contact[]>;
  newId(): string;
}
