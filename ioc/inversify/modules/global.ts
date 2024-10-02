import { HTTP_CLIENT_TYPE, HttpClient } from '@infrastructure/external/httpclient';
import { SuperAgentHttpClient } from '@infrastructure/external/httpclient/super-agent';
import { IoCModuleDefinition } from '@ioc/index';
import { ContainerModule, interfaces } from 'inversify';

export const globalModule: IoCModuleDefinition<ContainerModule> = {
  adapters: new ContainerModule((bind: interfaces.Bind) => {
    bind<HttpClient>(HTTP_CLIENT_TYPE).to(SuperAgentHttpClient);
  }),
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  controllers: new ContainerModule((bind: interfaces.Bind) => {}),
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  usecases: new ContainerModule((bind: interfaces.Bind) => {}),
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  domainServices: new ContainerModule((bind: interfaces.Bind) => {}),
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  constants: new ContainerModule((bind: interfaces.Bind) => {}),
};
