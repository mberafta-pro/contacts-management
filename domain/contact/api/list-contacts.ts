import { QueryHandler } from '@domain/shared-kernel/query-handler';

export const LIST_CONTACTS_USECASE = Symbol.for('ListContactsUsecase');

export type ListContactsQuery = {
  ownerId: string;
  page: number;
  size: number;
};

export interface ListContactsUsecase extends QueryHandler<ListContactsQuery> {}
