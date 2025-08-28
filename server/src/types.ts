export interface User {
    Id : string;
    FistName : string;
    LastName : string;
    Username : string;
    Email : string;
    Password : string;
}
export interface Post {
    Id : string;
    Title : string;
    Url : string;
    UserId : string;
    PostAt : number;
}
export interface Likes {
    UserId : string;
    PostId : string;
}
export interface Comment {
    Id : string;
    UserId : string;
    PostId : string;
    Comment : string;
    postedAt : number;
}