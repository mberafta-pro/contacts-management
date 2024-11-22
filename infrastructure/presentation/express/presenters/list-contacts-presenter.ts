import { Contact } from '@domain/contact/entities';
import { Presenter } from '@domain/shared-kernel/presenter';

export type ContactListDto = {
  id: string;
  externalId: string;
  source: string;
  name: string;
};

export class ListContactsPresenter implements Presenter<Contact[], ContactListDto[]> {
  content?: ContactListDto[];

  present(domain: Contact[]): void {
    this.content = domain.map((contact) => ({
      id: contact.id,
      externalId: contact.externalId,
      source: contact.source,
      name: `${contact.identity.firstName} ${contact.identity.lastName}`,
    }));
  }
}
