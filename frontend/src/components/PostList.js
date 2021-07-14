import React, {useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";

const apiUrl = "http://localhost:8000/api/posts/";

export default function PostList() {
    const { store: { jwtToken } } = useAppContext();
    const [postList, setPostList] = useState([]);
    const headers = { Authorization: `JWT ${jwtToken}` };

    useEffect(() => {
        Axios.get(apiUrl, { headers })
            .then(response => {
                const { data } = response;
                console.log("postlist:", response);
                setPostList(data);
            })
            .catch(error => {
                console.log(error)
            })
    },[]);

    return (
        <div>
            {postList.length === 0 && 
                <Alert 
                    type="warning"
                    message="게시할 포스팅이 없습니다."
                    description="새포스트를 쓰거나, 친구를 추가해 친구의 포스트를 볼 수 있습니다."
                />}
            {postList.map(post => <Post post={post} key={post.id}/>)}   
        </div>
    );
}