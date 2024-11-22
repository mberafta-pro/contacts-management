import { ConnectorAccess } from '@domain/contact/value-objects/connector-access';
import { injectable } from 'inversify';
import 'reflect-metadata';

export const CONNECTOR_ACCESS_ENCRYPTER_TYPE = Symbol.for('ConnectorAccessEncrypter');

@injectable()
export class ConnectorAccessEncrypter {
  encrypt(access: ConnectorAccess) {
    return Object.entries(access.toJson()).reduce((result, [key, value]) => {
      return {
        ...result,
        [key]: btoa(value),
      };
    }, {});
  }

  decrypt(access: ConnectorAccess) {
    return Object.entries(access.toJson()).reduce(
      (result, [key, value]) => {
        return {
          ...result,
          [key]: atob(value),
        };
      },
      {} as Record<string, string>
    );
  }
}
