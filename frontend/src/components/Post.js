import React from "react";

export default function Post({post}) {
    
        const { id, photo, caption, location } = post;
        return (
            <div>
                <img src={photo} alt={caption}/>
                {caption}, {location}
            </div>
        )
}