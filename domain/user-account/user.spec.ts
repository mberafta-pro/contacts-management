import { RequiredInformationError } from "@domain/errors/required-information-error";
import { User } from "@domain/user-account/user";

describe('DOMAIN - User account > User tests', () => {
    describe('GIVEN I provide an input to create a new user', () => {
        describe('WHEN Id is empty', () => {
            it('THEN A Required information error should be raised', () => {
                expect(() => User.from({id : ''})).toThrow(RequiredInformationError);
            });
        });
    });
});