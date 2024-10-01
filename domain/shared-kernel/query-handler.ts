import { Presenter } from '@domain/shared-kernel/presenter';

export interface QueryHandler<TQuery> {
  handle(presenter: Presenter<unknown, unknown>, query: TQuery): Promise<void>;
}
