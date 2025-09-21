import { 
    signInRequest, 
    signInResponse, 
    signUpRequest, 
    signUpResponse 
} from '@/api';
import { signJwt } from '@/auth';
import { db } from '@/datastore';
import { ExpressHandler, User } from '@/types';
import crypto from 'crypto';

// Signup Handler
export const signUpHandler: ExpressHandler<signUpRequest, signUpResponse> = async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;

    if (!firstName || !lastName || !userName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = (await db.getUserByEmail(email)) || (await db.getUserByuserName(userName));
    if (existing) {
        return res.status(403).json({ message: 'User already exists' });
    }

    const user: User = {
        id: crypto.randomUUID(),
        email,
        firstName,
        lastName,
        userName,
        password, 
    };

    await db.createUser(user);
    const jwt = signJwt({userId:user.id});
    return res.status(200).send(
    {
        user:{
            id: user.id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            userName:user.userName
        },

        jwt,
    }
    )


};

// Signin Handler
export const signInHandler: ExpressHandler<signInRequest, signInResponse> = async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: 'Login and password are required' });
    }

    const existing = (await db.getUserByEmail(login)) || (await db.getUserByuserName(login));

    if (!existing || existing.password !== password) {
        return res.status(403).json({ message: 'Invalid login or password' });
    }

    const jwt = signJwt({userId : existing.id});
    return res.status(200).json({
        message: 'Login successful',
        user: {
            email: existing.email,
            id: existing.id,
            firstName: existing.firstName,
            lastName: existing.lastName,
            userName: existing.userName,
        },
        jwt,
    });
};
