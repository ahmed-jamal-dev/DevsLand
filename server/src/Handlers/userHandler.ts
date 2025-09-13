import { signInRequest, signInResponse, singUpRequest, singUpResponse } from '@/api';
import { db } from '@/datastore';
import { ExpressHandler, User } from '@/types';
import crypto from 'crypto';

//signup handler
export const signUpHandler: ExpressHandler<singUpRequest, singUpResponse> = async (req, res) => {
    const { FirstName, LastName, userName, Email, password } = req.body;
    if (!FirstName || !LastName || !userName || !Email || !password) {
        return res.status(400).send('All fields are required');
    }

    const existing = (await db.getUserByEmail(Email)) || (await db.getUserByuserName(userName));
    if (existing) {
        return res.status(403).send('User already exists');
    }
    const user: User = {
        Id: crypto.randomUUID(),
        Email,
        password,
        FirstName,
        LastName,
        userName,
    };
    await db.createUser(user);
    return res.status(200);
};
//signin handler
export const signInHandler: ExpressHandler<signInRequest, signInResponse> = async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.sendStatus(400);
    }
 const existing = (await db.getUserByEmail(login)) || (await db.getUserByuserName(login));
console.log('existing:', existing);
console.log('login:', login, 'password:', password);
if ( !existing || existing.password !== password ) {
  return res.sendStatus(403);
}
console.log('hello');

    return res.status(200).send({
      Email: existing.Email,
      FirstName: existing.FirstName,
      LastName: existing.LastName,
      Id: existing.Id,
      userName: existing.userName,
    });  
};

