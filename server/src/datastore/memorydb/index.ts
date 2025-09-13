import { User, Post, Likes, Comment } from '@types';
import { DataStore } from '@datastore';
export class InMemoryDataStore implements DataStore {
    private users: User[] = [];
    private posts: Post[] = [];
    private comments: Comment[] = [];
    private likes: Likes[] = [];

    createUser(user: User): void {
        this.users.push(user);
    }
    getUserByEmail(email: string):Promise< User | undefined> {
        return Promise.resolve(this.users.find(user => user.Email === email));
    }
    getUserByuserName(userName: string):Promise< User | undefined >{
        return Promise.resolve(this.users.find(user => user.userName === userName));
    }
    listPosts(): Promise<Post[]> {
        return Promise.resolve(this.posts);
    }
    createPost(post: Post):Promise< void> {
        this.posts.push(post);
        return Promise.resolve();
    }
    getPost(id: string):Promise< Post | undefined> {
        return Promise.resolve(this.posts.find(post => post.Id === id));
    }
    deletePost(id: string):Promise< void> {
        const index = this.posts.findIndex(post => post.Id === id);
        if (index === -1) {
            return Promise.resolve(); 

        }
        this.posts.splice(index, 1);
        return Promise.resolve();
    }
    createLike(like: Likes): Promise<void > {
        this.likes.push(like);
        return Promise.resolve();
    }
    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }
    listComments(postId: string): Promise<Comment[]> {
        return Promise.resolve(this.comments.filter(comment => comment.PostId === postId));
    }
    deleteComment(id: string): Promise<void> {
        const index = this.comments.findIndex(comment => comment.Id === id);
        if (index === -1) {
            return Promise.resolve();
        }
        this.comments.splice(index, 1);
        return Promise.resolve();
    }
}
