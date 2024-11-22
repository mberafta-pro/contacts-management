import { CommandHandler } from '@domain/shared-kernel/command-handler';

export const SYNCHRONIZE_CONTACTS_USECASE_TYPE = Symbol.for('SynchronizeContactsUsecase');

export type SynchronizeContactsCommand = {
  connectorId: string;
};

export interface SynchronizeContactsUsecase extends CommandHandler<SynchronizeContactsCommand> {}
