import { Presenter } from '@domain/shared-kernel/presenter';
import { FindUserQuery, FindUserUsecase } from '@domain/user-account/api/find-user-usecase';
import { USER_REPOSITORY_TYPE, UserRepository } from '@domain/user-account/spi/user-repository';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class FindUser implements FindUserUsecase {
  constructor(@inject(USER_REPOSITORY_TYPE) private readonly userRepository: UserRepository) {}

  async handle(presenter: Presenter, query: FindUserQuery): Promise<void> {
    const user = await this.userRepository.findById(query.id);
    presenter.present(user);
  }
}
