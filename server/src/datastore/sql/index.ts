import sqlite3 from 'sqlite3';
import { open as sqliteOpen, Database } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { User, Post, Likes, Comment } from '@types';
import { DataStore } from '..';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class sqlDataStore implements DataStore {
    private db!: Database<sqlite3.Database, sqlite3.Statement>;
    public async opinDb() {
        // open the database
        this.db = await sqliteOpen({
            filename: path.join(__dirname, 'devsland.sqlite'),
            driver: sqlite3.Database,
        });
        // enable foreign key constraints
        this.db.run('PRAGMA foreign_keys = ON');
        // run migrations

        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations'),
        });
        return this;
    }
    createUser(user: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        throw new Error('Method not implemented.');
    }
    getUserByUsername(Username: string): Promise<User | undefined> {
        throw new Error('Method not implemented.');
    }
    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM posts');
    }
    async createPost(post: Post): Promise<void> {
        await this.db.run(
            'INSERT INTO posts (id , title , url , userId , postedAt) VALUES (?, ?, ?, ?, ?)',
            post.Id,
            post.Title,
            post.Url,
            post.UserId,
            post.PostedAt
        );
    }
    getPost(id: string): Promise<Post | undefined> {
        throw new Error('Method not implemented.');
    }
    deletePost(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    createLike(like: Likes): Promise<void> {
        throw new Error('Method not implemented.');
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error('Method not implemented.');
    }
    listComments(postId: string): Promise<Comment[]> {
        throw new Error('Method not implemented.');
    }
    deleteComment(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
