import React from "react";
import Axios from "axios";
import { Avatar, Card } from "antd";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import CommentList from "./CommentList";

export default function Post({ post, handleLike }) {
    
    const { author, photo, caption, location, tag_set, is_like } = post;
    const { username, name, avatar_url } = author;

    return (
        <div className="post" style={{marginLeft: '0.5rem', marginBottom: '1rem'}}>
            <Card
                hoverable
                cover={<img src={photo} alt={caption}/>}
                actions={[
                    is_like ? (
                        <HeartTwoTone twoToneColor="#eb2f96" onClick={() => handleLike({post, isLike: false})} />
                    ) : (
                        <HeartOutlined onClick={() => handleLike({post, isLike: true})} />
                    )
                ]}
            >
                <Card.Meta 
                    avatar={
                        <Avatar size="large" 
                                icon={<img 
                                    src={ avatar_url }
                                    alt={ username } 
                                />}
                                style={{marginLeft: '0.5rem'}}
                        />}
                    title={location} 
                    description={caption}
                />
                <CommentList post={post}/>
            </Card>
        </div>
    )
}