import { CommandHandler } from '@domain/shared-kernel/command-handler';

export const SIGNUP_USECASE_TYPE = Symbol.for('SignupUsecase');

export type SignupCommand = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export interface SignupUsecase extends CommandHandler<SignupCommand> {}
