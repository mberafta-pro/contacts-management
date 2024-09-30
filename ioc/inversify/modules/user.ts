import { FIND_USER_TYPE, FindUser } from "@application/query-handlers/find-user";
import { USER_REPOSITORY_TYPE } from "@domain/user-account/ports/user-repository";
import { PostgresUserRepository } from "@infrastructure/persistence/postgres/adapters/user-repository";
import { IoCModuleDefinition } from "@ioc/index";
import { ContainerModule, interfaces } from "inversify";

export const userModule: IoCModuleDefinition<ContainerModule> = {
    adapters: new ContainerModule((bind: interfaces.Bind) => {
        bind(USER_REPOSITORY_TYPE).to(PostgresUserRepository);
    }),
    controllers: new ContainerModule((bind: interfaces.Bind) => { }),
    usecases: new ContainerModule((bind: interfaces.Bind) => {
        bind(FIND_USER_TYPE).to(FindUser);
    }),
    domainServices: new ContainerModule((bind: interfaces.Bind) => { }),
    constants: new ContainerModule((bind: interfaces.Bind) => { }),
}