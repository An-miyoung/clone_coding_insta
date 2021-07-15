import React from "react";
import useAxios from "axios-hooks";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";


export default function PostList() {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `JWT ${jwtToken}` };

    const [{ data: postList, loading, error}, refetch] = useAxios(
        { url: "http://localhost:8000/api/posts/",
          headers,}
    );
    

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
                    <Post post={post} key={post.id}/>
                )
            }   
        </div>
    );
}