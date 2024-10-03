import { ListContactsQuery, ListContactsUsecase } from '@domain/contact/api/list-contacts';
import { CONTACT_REPOSITORY_TYPE, ContactRepository } from '@domain/contact/spi/contact-repository';
import { Presenter } from '@domain/shared-kernel/presenter';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ListContacts implements ListContactsUsecase {
  constructor(
    @inject(CONTACT_REPOSITORY_TYPE) private readonly contactRepository: ContactRepository
  ) {}

  async handle(presenter: Presenter, query: ListContactsQuery): Promise<void> {
    const contacts = await this.contactRepository.getAll(query.ownerId, query.page, query.size);

    presenter.present(contacts);
  }
}
