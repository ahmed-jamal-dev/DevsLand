import { User, Post, Likes, Comment } from '@types';
import { DataStore } from '@datastore';
export class InMemoryDataStore implements DataStore {
    private users: User[] = [];
    private posts: Post[] = [];
    private Comment: Comment[] = [];
    private likes: Likes[] = [];
    
    createUser(user: User): void {
        this.users.push(user);
    }
    getUserByEmail(email: string):Promise< User | undefined> {
        return Promise.resolve(this.users.find(user => user.email === email));
    }
    getUserById(id: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.id === id));
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
        return Promise.resolve(this.posts.find(post => post.id === id));
    }
    deletePost(id: string):Promise< void> {
        const index = this.posts.findIndex(post => post.id === id);
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
        this.Comment.push(comment);
        return Promise.resolve();
    }
    listComment(postId: string): Promise<Comment[]> {
        return Promise.resolve(this.Comment.filter(comment => comment.postId === postId));
    }
    deleteComment(id: string): Promise<void> {
        const index = this.Comment.findIndex(comment => comment.id === id);
        if (index === -1) {
            return Promise.resolve();
        }
        this.Comment.splice(index, 1);
        return Promise.resolve();
    }
}
