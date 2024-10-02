import { Contact } from "@domain/contact";

export interface ContactRepository {
    create(contact: Contact): Promise<void>;
    newId(): string;
}