import { User, Post, Likes, Comment } from '../../types.js';
import { DataStore } from '../index.js';
export class InMemoryDataStore implements DataStore {
    private users: User[] = [];
    private posts: Post[] = [];
    private comments: Comment[] = [];
    private likes: Likes[] = [];

    createUser(user: User): void {
        this.users.push(user);
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.Email === email);
    }
    getUserByUsername(Username: string): User | undefined {
        return this.users.find(user => user.Username === Username);
    }
    listPosts(): Post[] {
        return this.posts;
    }
    createPost(post: Post): void {
        this.posts.push(post);
    }
    getPost(id: string): Post | undefined {
        return this.posts.find(post => post.Id === id);
    }
    deletePost(id: string): void {
        const index = this.posts.findIndex(post => post.Id === id);
        if (index === -1) return;
        this.posts.splice(index, 1);
    }
    createLike(like: Likes): void {
        this.likes.push(like);
    }
    createComment(comment: Comment): void {
        this.comments.push(comment);
    }
    listComments(postId: string): Comment[] {
        return this.comments.filter(comment => comment.PostId === postId);
    }
    deleteComment(id: string): void {
        const index = this.comments.findIndex(comment => comment.Id === id);
        if (index === -1) return;
        this.comments.splice(index, 1);
    }
}
