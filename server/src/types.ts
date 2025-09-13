import { RequestHandler } from 'express';

export interface User {
    Id: string;
    FirstName: string;
    LastName: string;
    userName: string;
    Email: string;
    password: string;
}
export interface Post {
    Id: string;
    Title: string;
    Url: string;
    UserId: string;
    PostedAt: number;
}
export interface Likes {
    UserId: string;
    PostId: string;
}
export interface Comment {
    Id: string;
    UserId: string;
    PostId: string;
    Comment: string;
    postedAt: number;
}

export type ExpressHandler<Req, Res> = RequestHandler<string, Partial<Res>, Partial<Req>, any>;
