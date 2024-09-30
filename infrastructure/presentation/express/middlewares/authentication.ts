import { FIND_USER_TYPE, FindUser } from '@application/query-handlers/find-user';
import { FindUserPresenter } from '@infrastructure/presentation/express/presenters/find-user-presenter';
import { container } from '@ioc/inversify';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
  VerifiedCallback,
  VerifyCallbackWithRequest,
} from 'passport-jwt';

export const jwtMissingIdError = { error: 'Id is missing in current token' };
export const jwtUserNotFoundError = { error: 'No user has been found for current token' };

const { JWT_SECRET } = process.env;

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
  algorithms: ['HS256'],
  secretOrKey: JWT_SECRET ?? '',
};

const verifyRequest: VerifyCallbackWithRequest = async (
  request: Request,
  payload: JwtPayload,
  done: VerifiedCallback
) => {
  const { sub, user } = payload;
  if (!sub) return done(jwtMissingIdError);

  const findUser = container.get<FindUser>(FIND_USER_TYPE);
  const presenter = new FindUserPresenter();
  await findUser.handle(presenter, { email: sub });

  if(!presenter.presented) return done(jwtUserNotFoundError);
  
  return done(undefined, presenter.presented);
};

passport.use(new JwtStrategy(jwtOptions, verifyRequest));

export const authentication = passport.authenticate('jwt', { session: false });