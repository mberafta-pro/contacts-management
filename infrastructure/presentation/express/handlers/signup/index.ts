import { SignupUsecase } from '@domain/user-account/api/signup-usecase';
import { NextFunction, Request, Response } from 'express';

type SignupRequestBody = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

type SignupRequest = Request<object, SignupRequestBody>;

export const signupHandler =
  (usecase: SignupUsecase) =>
  async (request: SignupRequest, response: Response, next: NextFunction) => {
    try {
      await usecase.handle(request.body);
      response.status(201).end();
    } catch (error: unknown) {
      next({ error });
    }
  };
