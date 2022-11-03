import { Role } from './role';

export class User {
    id: string;
    displayName: string;
    token: string;
    email: string;
    isAdmin: Role
}
