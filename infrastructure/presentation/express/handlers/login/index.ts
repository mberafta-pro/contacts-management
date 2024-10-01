import { LoginUsecase } from '@domain/user-account/api/login-usecase';
import { NextFunction, Request, RequestHandler, Response } from 'express';

type LoginRequestBody = { email: string; password: string };
type LoginResponseBody = { token: string };

type LoginRequest = Request<object, LoginRequestBody>;
type LoginResponse = Response<LoginResponseBody>;

export const loginHandler =
  (usecase: LoginUsecase): RequestHandler =>
  async (request: LoginRequest, response: LoginResponse, next: NextFunction) => {
    try {
      const token = await usecase.handle(request.body);
      response.status(200).json({ token });
    } catch (error: unknown) {
      next({ error });
    }
  };
