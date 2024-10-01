import {
  FIND_USER_USECASE_TYPE,
  FindUserUsecase,
} from '@domain/user-account/api/find-user-usecase';
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
  const { sub = '' } = payload;
  const findUser = container.get<FindUserUsecase>(FIND_USER_USECASE_TYPE);
  const presenter = new FindUserPresenter();

  await findUser.handle(presenter, { id: sub });

  if (!presenter.content) return done(jwtUserNotFoundError);

  return done(undefined, presenter.content);
};

passport.use(new JwtStrategy(jwtOptions, verifyRequest));

export const authentication = passport.authenticate('jwt', { session: false });
