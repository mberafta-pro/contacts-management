import { Schema } from 'express-validator';

export const signupSchema: Schema = {
  firstName: { isString: true },
  lastName: { isString: true },
  email: { isEmail: true },
  password: { isString: true },
};
