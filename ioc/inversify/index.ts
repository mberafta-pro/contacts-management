import { IoC } from '@ioc/index';
import { userModule } from '@ioc/inversify/modules/user';
import { Container } from 'inversify';

export class InversifyIoC implements IoC {
    public readonly container: Container;

    constructor() {
        this.container = new Container();
        this.bindAdapters();
        this.bindConstants();
        this.bindUsecases();
        this.bindControllers();
        this.bindDomainServices();
    }

    bindAdapters() {
        this.container.load(userModule.adapters);
    }

    bindConstants() {
        this.container.load(userModule.constants);
    }

    bindControllers() {
        this.container.load(userModule.controllers);
    }

    bindUsecases() {
        this.container.load(userModule.usecases);
    }

    bindDomainServices(): void {
        this.container.load(userModule.domainServices);
    }
}

export const { container } = new InversifyIoC();
