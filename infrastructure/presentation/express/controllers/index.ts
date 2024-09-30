import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class ApiController {
  protected abstract configureRoutes(): void;
  constructor(public readonly path: string) {}
}
