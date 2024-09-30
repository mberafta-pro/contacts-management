import { User } from "@domain/user-account/user";

export const USER_REPOSITORY_TYPE = Symbol.for('UserRepository');

export interface UserRepository {
    create(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}