import { QueryHandler } from '@domain/shared-kernel/query-handler';

export const FIND_USER_USECASE_TYPE = Symbol.for('FindUserUsecase');

export type FindUserQuery = {
  id: string;
};

export interface FindUserUsecase extends QueryHandler<FindUserQuery> {}
