import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useAppContext } from "store";
import { Card } from 'antd';
import Suggestion from "components/Suggestion";

const apiUrl = "http://localhost:8000/accounts/suggestions/";

export default function SuggestionList() {
    const { store: { jwtToken } } = useAppContext();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        async function  fetchUseList() {
            const headers = { Authorization: `JWT ${jwtToken}` };
            try {
                const { data }  = await Axios.get(apiUrl, { headers })
                console.log("userList", data);
                setUserList(data);
            }
            catch(error) {
                console.log(error)
            } 
        }
        fetchUseList();
    },[]);

    return (
        <Card title="당신이 알만한 친구들" size="small" style={{width:'300px'}}>
            { userList.map(suggestionUser =>
                < Suggestion 
                    key={suggestionUser.username} 
                    suggestionUser={suggestionUser} 
                />
            )}
        </Card>
    )
}