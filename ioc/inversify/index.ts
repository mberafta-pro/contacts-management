import { IoC } from '@ioc/index';
import { contactModule } from '@ioc/inversify/modules/contact';
import { globalModule } from '@ioc/inversify/modules/global';
import { userModule } from '@ioc/inversify/modules/user';
import { Container } from 'inversify';

export class InversifyIoC implements IoC {
  public readonly container: Container;

  private readonly modules = [userModule, contactModule, globalModule];

  constructor() {
    this.container = new Container();
    this.bindAdapters();
    this.bindConstants();
    this.bindUsecases();
    this.bindControllers();
    this.bindDomainServices();
  }

  bindAdapters() {
    this.modules.forEach((module) => this.container.load(module.adapters));
  }

  bindConstants() {
    this.modules.forEach((module) => this.container.load(module.constants));
  }

  bindControllers() {
    this.modules.forEach((module) => this.container.load(module.controllers));
  }

  bindUsecases() {
    this.modules.forEach((module) => this.container.load(module.usecases));
  }

  bindDomainServices() {
    this.modules.forEach((module) => this.container.load(module.domainServices));
  }
}

export const { container } = new InversifyIoC();
