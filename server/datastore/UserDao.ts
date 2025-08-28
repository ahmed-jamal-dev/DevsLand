import { User } from "../src/types";
export interface UesrDao{
    createUser(user: User):void;
    getUserByEmail(email: string): User | undefined;
    getUserByUsername(Username: string): User | undefined; 
}