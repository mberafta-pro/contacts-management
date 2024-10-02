import { Contact } from '@domain/contact/entities';
import { ContactRepository } from '@domain/contact/spi/contact-repository';
import ContactModel from '@infrastructure/persistence/postgres/models/contact';
import { v4 } from 'uuid';
import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export class PostgresContactRepository implements ContactRepository {
  async create(contact: Contact): Promise<void> {
    await ContactModel.create({
      id: contact.id,
      externalId: contact.externalId,
      source: contact.source,
      firstName: contact.identity.firstName,
      lastName: contact.identity.lastName,
      email: contact.reachabilityInformations.email,
      phoneNumber: contact.reachabilityInformations.phoneNumber,
    });
  }

  async getAll(page: number, size: number): Promise<Contact[]> {
    const contacts = await ContactModel.findAll({ offset: page * size, limit: size });
    return contacts.map((contact) =>
      Contact.from({
        id: contact.id,
        externalId: contact.externalId,
        source: contact.source,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
      })
    );
  }

  newId(): string {
    return v4();
  }
}
