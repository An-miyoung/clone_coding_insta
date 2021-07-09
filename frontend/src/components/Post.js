import React from "react";
import { Avatar, Card } from "antd";
import { HeartOutlined, UserOutlined} from "@ant-design/icons";

export default function Post({post}) {
    
        const { photo, caption, location } = post;
        return (
            <div className="post" style={{marginBottom:'2rem'}}>
                <Card
                    hoverable
                    cover={<img src={photo} alt={caption}/>}
                    actions={[<HeartOutlined />]}
                >
                    <Card.Meta 
                        avatar={<Avatar size="large" icon={<UserOutlined />} />}
                        title={location} 
                        description={caption}
                    />
                </Card>
            </div>
        )
}