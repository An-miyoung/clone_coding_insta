import React, { useState } from "react";
import Axios from "axios";
import useAxios from "axios-hooks";
import { Button, Input } from "antd";
import { useAppContext } from "store";
import Comment from "./Comment";

export default function  CommentList({ post }) {
    // const { author, message, post } = post;
    const { store: { jwtToken } } = useAppContext();
    const [ commentContent, setCommentContent] = useState([]);

    const headers = { Authorization: `JWT ${jwtToken}` };

    const [{ data: commentList, loading, error}, refetch] = useAxios(
        { url: `http://localhost:8000/api/posts/${post.id}/comments/`,
          headers,}
    );

    const handleCommentSave = async () => {
        try {
            const apiUrl = `http://localhost:8000/api/posts/${post.id}/comments/`
            await Axios.post(apiUrl, { message: commentContent }, {headers});
            setCommentContent("");
            refetch();
        }
        catch(error) {
            console.log(error)
        }
        console.log("handleCommentSave :", commentContent);
    };

    return (
        <div>
            {commentList && commentList.map(comment => 
                <Comment comment={comment} pk={comment.id}/>
            )}
            
            <Input.TextArea 
                style={{marginBottom: "0.5em"}}
                value= {commentContent}
                onChange={e => setCommentContent(e.target.value)}
            />
            <Button 
                block type="primary" 
                disabled={commentContent.length === 0}
                onClick={handleCommentSave}
            >댓글올리기
            </Button>
        </div>
    )
    
}