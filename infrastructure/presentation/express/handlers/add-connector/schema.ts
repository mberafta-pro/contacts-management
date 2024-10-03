import { Schema } from 'express-validator';

export const addConnectorSchema: Schema = {
  source: {
    isString: true,
  },
  params: {
    isObject: true,
  },
};
