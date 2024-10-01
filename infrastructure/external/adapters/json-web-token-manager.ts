import 'reflect-metadata';
import { injectable } from 'inversify';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { User, UserInputDto } from '@domain/user-account/user';
import { TokenManager } from '@domain/user-account/spi/token-manager';

export type UserPayload = {
  firstname: string;
  lastname: string;
  email: string;
};

type JsonWebToken = JwtPayload & {
  user: Omit<UserInputDto, 'id'>;
};

const { JWT_SECRET = '' } = process.env;
export const JSON_WEB_TOKEN_MANAGER_TYPE = Symbol.for('JsonWebTokenManager');

@injectable()
export class JsonWebTokenManager implements TokenManager {
  private payloadFrom(user: User): JsonWebToken {
    return {
      sub: user.id,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      iss: 'user-management',
    };
  }

  async generateFrom(user: User) {
    return sign(this.payloadFrom(user), JWT_SECRET, { algorithm: 'HS256', expiresIn: 60 * 60 });
  }

  async decode(token: string) {
    const verified = (await verify(token, JWT_SECRET, { algorithms: ['HS256'] })) as JsonWebToken;

    return User.from({
      id: verified.sub ?? '',
      firstName: verified.user.firstName,
      lastName: verified.user.lastName,
      email: verified.user.email,
    });
  }
}
