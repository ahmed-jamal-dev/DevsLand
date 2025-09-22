import { createCommentRequest, createCommentResponse, deleteCommentRequest, deleteCommentResponse, ListCommentRequest, ListCommentResponse } from '@/api';
import { db } from '@/datastore';
import { Comment, ExpressHandler } from '@/types';

export const createCommentHandler: ExpressHandler<
    createCommentRequest,
    createCommentResponse
> = async (req, res) => {
    const { postId, userId, content } = req.body;
    if (!postId || !userId || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
const comment: Comment = {
        id: crypto.randomUUID(),
        postId,
        userId,
        content,
        postedAt: Date.now(),
    };
    await db.createComment(comment)
    return res.status(201).json({ message: 'Comment created successfully', comment });
};
export const listCommentHandler : ExpressHandler<ListCommentRequest,ListCommentResponse> = async (req,res)=>{
    const {postId} = req.body;
    if (!postId){
        return res.status(400).json({ message: 'Post ID is required' });
    }
    const comments :Comment[] = await db.listComment(postId)
    return res.status(200).json({ comments });
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
