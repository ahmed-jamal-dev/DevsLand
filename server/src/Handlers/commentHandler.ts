import { createCommentRequest, createCommentResponse, deleteCommentRequest, deleteCommentResponse, ListCommentRequest, ListCommentResponse } from '@/api';
import { db } from '@/datastore';
import { Comment, ExpressHandler } from '@/types';

export const createCommentHandler: ExpressHandler<
    createCommentRequest,
    createCommentResponse
> = async (req, res) => {
    const { PostId, UserId, Comment } = req.body;
    if (!PostId || !UserId || !Comment) {
        return res.status(400).json({ massage: 'All fields are required' });
    }
const comment: Comment = {
    Id: crypto.randomUUID(),
    PostId,      
    UserId,
    Comment,
    postedAt: Date.now()
};
};
export const listCommentHandler : ExpressHandler<ListCommentRequest,ListCommentResponse> = async (req,res)=>{
    const {postId} = req.body;
    if (!postId){
        return res.status(400).json({ massage: 'Post ID is required' });
    }
    const Comment :Comment[] = await db.listComment(postId)
    return res.status(200).json({ Comment });
}

export const deleteCommentHandler : ExpressHandler<deleteCommentRequest,deleteCommentResponse> = async (req,res) =>{
        const {id} =req.body;
        if (!id)
            {
            return res.status(400).json({ message: 'Comment ID is required' });
            } 
                const deleted = async (async: any) =>{ await db.deleteComment(id);
                if(!deleted){
                            return res.status(404).json({ message: 'Comment not found' });

                }
                    return res.status(200).json({ message: 'Comment deleted successfully' });



}}
