import React from "react";
import { Card } from 'antd';
import Suggestion from "components/Suggestion";

export default function SuggestionList() {
    return (
        <Card title="당신이 알만한 친구들" size="small" >
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
        </Card>
    )
}