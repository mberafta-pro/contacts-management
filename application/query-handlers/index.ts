import { Presenter } from "@application/presenter";

export interface QueryHandler<TQuery> {
    handle(presenter: Presenter<unknown, unknown>, query: TQuery): Promise<void>;
}