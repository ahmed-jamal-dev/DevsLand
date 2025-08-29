import { User } from "../src/types.js";
export interface UesrDao{
    createUser(user: User):void;
    getUserByEmail(email: string): User | undefined;
    getUserByUsername(Username: string): User | undefined; 
}