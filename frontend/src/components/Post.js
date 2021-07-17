import React from "react";
import { Avatar, Card } from "antd";
import { HeartOutlined, UserOutlined} from "@ant-design/icons";

export default function Post({post}) {
    
        const { author, photo, caption, location, tag_set, like_user_set } = post;
        const { username, name, avatar_url } = author;

        return (
            <div className="post" style={{textAlign:'center'}}>
                <Card
                    hoverable
                    cover={<img src={photo} alt={caption}/>}
                    actions={[<HeartOutlined />]}
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