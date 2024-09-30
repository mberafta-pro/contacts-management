import { Entity } from "@domain/entity";
import { InvalidPasswordLengthError } from "@domain/errors/invalid-password-length-error";
import { RequiredInformationError } from "@domain/errors/required-information-error";

export type UserInputDto = {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
};

export class User implements Entity<string> {
    private constructor(
        readonly id: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly password: string,
    ) { }

    public static from(input: UserInputDto) {
        if (input.id.trim().length === 0) {
            throw new RequiredInformationError('User.id');
        }

        if (input.firstName.trim().length === 0) {
            throw new RequiredInformationError('User.firstName');
        }

        if (input.lastName.trim().length === 0) {
            throw new RequiredInformationError('User.lastName');
        }

        if (input.password.trim().length === 0) {
            throw new RequiredInformationError('User.password');
        }

        if(input.password.length < 3){
            throw new InvalidPasswordLengthError();
        }
        
        return new User(input.id, input.firstName, input.lastName, input.password);
    }
}