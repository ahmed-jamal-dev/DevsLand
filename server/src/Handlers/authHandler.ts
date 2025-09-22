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
import bcrypt from 'bcryptjs';

// ---------------- Signup Handler ----------------
export const signUpHandler: ExpressHandler<signUpRequest, signUpResponse> = async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;

    if (!firstName || !lastName || !userName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = (await db.getUserByEmail(email)) || (await db.getUserByuserName(userName));
    if (existing) {
        return res.status(403).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = {
        id: crypto.randomUUID(),
        email,
        firstName,
        lastName,
        userName,
        password: hashedPassword,
    };

    await db.createUser(user);

    const jwt = signJwt({ userId: user.id });

    return res.status(201).json({
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
        },
        jwt,
    });
};

// ---------------- Signin Handler ----------------
export const signInHandler: ExpressHandler<signInRequest, signInResponse> = async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ error: 'Login and password are required' });
    }

    const existing =
        (await db.getUserByEmail(login)) ||
        (await db.getUserByuserName(login));

    if (!existing) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const jwt = signJwt({ userId: existing.id });

    return res.status(200).json({
        user: {
            id: existing.id,
            email: existing.email,
            firstName: existing.firstName,
            lastName: existing.lastName,
            userName: existing.userName,
        },
        jwt,
    });
};
