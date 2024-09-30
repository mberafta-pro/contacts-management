import { Entity } from "@domain/entity";
import { RequiredInformationError } from "@domain/errors/required-information-error";

export type UserInputDto = {
    id: string,
};

export class User implements Entity<string> {
    private constructor(
        readonly id: string,
    ) { }

    public static from(input: UserInputDto) {
        if (input.id.trim().length === 0) {
            throw new RequiredInformationError('User.id');
        }
    }
}