import { User } from '@domain/user-account/entities/user';

export const TOKEN_MANAGER_TYPE = Symbol.for('TokenManager');

export interface TokenManager {
  generateFrom(user: User): Promise<string>;
  decode(token: string): Promise<User>;
}
