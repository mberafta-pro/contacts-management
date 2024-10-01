import { Schema } from 'express-validator';

export const loginSchema: Schema = {
  email: {
    isEmail: true,
  },
  password: {
    isString: true,
  },
};
