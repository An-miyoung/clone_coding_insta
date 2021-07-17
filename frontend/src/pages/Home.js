import React from "react";
import PostList from "components/PostList";
import { Button } from "antd";
import { useHistory } from "react-router";

export default function Home() {
    const history = useHistory();
    const handleClick = () => {
        history.push("/posts/new");
    };

    return (
        <>
            <div style={{textAlign:'center', marginBottom:'1rem'}}>
                <Button 
                    type="primary" 
                    style={{width:'300px'}}
                    onClick={handleClick}>
                    새로운 포스트 쓰기
                </Button>
            </div>
            <PostList />
        </>
    );  
}