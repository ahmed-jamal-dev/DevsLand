import { User } from '@types';
export interface UserDao {
    createUser(user: User): void;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByuserName(userName: string): Promise<User | undefined>;
}
