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
    async createUser(user: User): Promise<void> {
        await this.db.run(
            'INSERT INTO users (id , email , password , firstName , lastName , userName) VALUES (?, ?, ?, ?, ?, ?)',
            user.id,
            user.email,
            user.password,
            user.firstName,
            user.lastName,
            user.userName
        );
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT * FROM users WHERE email = ?', email);
    }
    getUserById(id: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT * FROM users WHERE id = ?' , id)
    }
    getUserByuserName(userName: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT * FROM users WHERE userName = ?', userName);
    }
    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM posts');
    }
    async createPost(post: Post): Promise<void> {
        await this.db.run(
            'INSERT INTO posts (id , title , url , userId , postedAt) VALUES (?, ?, ?, ?, ?)',
            post.id,
            post.title,
            post.url,
            post.userId,
            post.postedAt
        );
    }
    async getPost(id: string): Promise<Post | undefined> {
        return this.db.get<Post>('SELECT * FROM posts WHERE id = ?', id);
    }

    async deletePost(id: string): Promise<void> {
        await this.db.run('DELETE FROM posts WHERE id = ?', id);
    }

    async createLike(like: Likes): Promise<void> {
        await this.db.run(
            'INSERT INTO likes (UserId, PostId) VALUES (?, ?)',
            like.userId,
            like.postId
        );
    }

    async createComment(comment: Comment): Promise<void> {
        await this.db.run(
            'INSERT INTO comment (userId, postId, content, postedAt) VALUES (?, ?, ?, ?)',
            comment.userId,
            comment.postId,
            comment.content,
            comment.postedAt
        );
    }

    async listComment(postId: string): Promise<Comment[]> {
        return this.db.all<Comment[]>(
            'SELECT * FROM comment WHERE postId = ? ORDER BY postedAt ASC',
            postId
        );
    }

    async deleteComment(id: string): Promise<void> {
        await this.db.run('DELETE FROM comment WHERE id = ?', id);
    }
}
