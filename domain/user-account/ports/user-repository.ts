import { User } from "@domain/user-account/user";

export interface UserRepository {
    create(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}