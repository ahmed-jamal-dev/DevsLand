import { User } from '../types.js';
export interface UesrDao {
    createUser(user: User): void;
    getUserByEmail(email: string): User | undefined;
    getUserByUsername(Username: string): User | undefined;
}
