import { User } from '@types';
export interface UserDao {
    createUser(user: User): void;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByUsername(Username: string): Promise<User | undefined>;
}
