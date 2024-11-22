import { CommandHandler } from '@domain/shared-kernel/command-handler';

export const ADD_CONNECTOR_USECASE_TYPE = Symbol.for('AddConnectorUsecase');

export type AddConnectorCommand = {
  ownerId: string;
  source: string;
  params: Record<string, string | number>;
};

export interface AddConnectorUsecase extends CommandHandler<AddConnectorCommand> {}
