import React from "react";
import { Avatar, Card } from "antd";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";

export default function Post({ post, handleLike }) {
    
        const { author, photo, caption, location, tag_set, is_like } = post;
        const { username, name, avatar_url } = author;

        return (
            <div className="post" style={{textAlign:'center', marginBottom: '1rem'}}>
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
                                        src={ `http://localhost:8000` + avatar_url }
                                        alt={ username } 
                                    />} 
                            />}
                        title={location} 
                        description={caption}
                    />
                </Card>
            </div>
        )
}