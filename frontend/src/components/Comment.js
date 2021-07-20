import React from "react";
import { Comment as AntdComment, Avatar, Tooltip} from "antd";
// yarn add moment 로 설치 후 사용
import moment from "moment";

export default function Comment({ comment }) {
    const { author: { username, name, avatar_url }, message, created_at } = comment;
    return (
        <div>
            <AntdComment 
                author={ name.length === 0 ? username : name }
                avatar={
                    <Avatar
                        src={ avatar_url }
                        alt={ username }
                    />
                }
                content={
                    <p>
                      { message }
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format(created_at)}>
                        <span>{moment(created_at).fromNow()}</span>
                    </Tooltip>
                }
            />
        </div>
    )
}