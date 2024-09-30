import { Presenter } from "@application/presenter";
import { FindUserQuery } from "@application/queries/find-user-query";
import { QueryHandler } from "@application/query-handlers";
import { USER_REPOSITORY_TYPE, UserRepository } from "@domain/user-account/ports/user-repository";
import { inject, injectable } from "inversify";
import 'reflect-metadata';

export const FIND_USER_TYPE = Symbol.for('FindUser');

@injectable()
export class FindUser implements QueryHandler<FindUserQuery>{
    public constructor(
        @inject(USER_REPOSITORY_TYPE) private readonly userRepository:UserRepository,
    ){}

    async handle(presenter: Presenter, query: FindUserQuery): Promise<void> {
        const user = await this.userRepository.findByEmail(query.email);
        presenter.present(user);
    }
}