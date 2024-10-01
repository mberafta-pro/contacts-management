import { CommandHandler } from '@domain/shared-kernel/command-handler';

export const LOGIN_USECASE_TYPE = Symbol.for('LoginUsecase');

export type LoginCommand = {
  email: string;
  password: string;
};

export interface LoginUsecase extends CommandHandler<LoginCommand, string> {}
