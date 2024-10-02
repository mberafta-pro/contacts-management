export interface IoC {
  bindControllers(): void;
  bindUsecases(): void;
  bindAdapters(): void;
  bindConstants(): void;
  bindDomainServices(): void;
}

export interface IoCModuleDefinition<TContainer> {
  adapters: TContainer;
  constants: TContainer;
  controllers: TContainer;
  usecases: TContainer;
  domainServices: TContainer;
}
