import React, { useEffect, useState } from "react";
import Axios from "axios";
import useAxios from "axios-hooks";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";
import axios from "axios";


export default function PostList() {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `JWT ${jwtToken}` };
    const [ postList, setPostList ] = useState([]);

    const [{ data: originPostList, loading, error}, refetch] = useAxios(
        { url: "http://localhost:8000/api/posts/",
          headers,}
    );

    useEffect(() => {
        setPostList(originPostList);
    },[originPostList]);
    
    const handleLike = async ({ post, isLike }) => {
        const apiUrl = `http://localhost:8000/api/posts/${post.id}/like/`;
        const method = isLike ? "POST" : "DELETE";
        try {
            const response = await Axios({
                url: apiUrl,
                method,
                headers
            });
            setPostList(prevList => {
                return prevList.map(currentPost => 
                    currentPost === post ? {...currentPost, is_like: isLike} : currentPost)
            });
            console.log("response handleLike : ", response);
        }
        catch(error) {
            console.log(error);
        }
    };

    return (
        <div>
            {loading && <div>로딩중~~~</div>}
            {error && <div>로딩중 에러가 발생했습니다.</div>}

            { postList &&
                postList.length === 0 && 
                <Alert 
                    type="warning"
                    message="게시할 포스팅이 없습니다."
                    description="새포스트를 쓰거나, 친구를 추가해 친구의 포스트를 볼 수 있습니다."
                />
            }
            { postList &&                
                postList.map(post => 
                    <Post post={post} key={post.id} handleLike={handleLike} />
                )
            }   
        </div>
    );
}