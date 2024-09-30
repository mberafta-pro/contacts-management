import { Presenter } from "@application/presenter";
import { User } from "@domain/user-account/user";

type UserOutput = {
    id: string;
    firstName: string;
    lastName: string;
};

export class FindUserPresenter extends Presenter<User, UserOutput | null> {
    presented: UserOutput | null = null;

    constructor() {
        super();
    }

    present(domain: User | null) {
        if (domain == null) return;

        this.presented = {
            id: domain.id,
            firstName: domain.firstName,
            lastName: domain.lastName
        };
    }
}
