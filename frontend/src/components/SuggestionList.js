import React, { useEffect, useState } from "react";
import Axios from "axios";
import useAxios from "axios-hooks";
import { useAppContext } from "store";
import { Card } from 'antd';
import Suggestion from "components/Suggestion";


export default function SuggestionList() {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `JWT ${jwtToken}` };

    const [ userList, setUserList ] = useState([]);

    const [{ data: origUserList, loading, error }, refetch] = useAxios(
       { url: "http://localhost:8000/accounts/suggestions/",
         headers,}
    );

    useEffect(() => {
        if ( !origUserList ) 
            setUserList([]);
        else 
            setUserList(
                origUserList.map(user => ({
                    ...user,
                    is_follow: false,
                }))
            )
    }, [origUserList]);
    // const userList = origUserList && origUserList.map(user => ({ ...user, is_follow:false}));

    const onFollowUser = username => {
        Axios.post("http://localhost:8000/accounts/follow/", { username }, { headers })
            .then(response => {
                setUserList(prevUserList => 
                    prevUserList.map(user => 
                        ( user.username !== username ) ? user : {...user, is_follow: true}
                )  
            )})
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
        {loading && <div>로딩중~~~</div>}
        {error && <div>로딩중 에러가 발생했습니다.</div>}

        {/* <button onClick={() => refetch}>reload</button> */}

        <Card title="당신에게 추천하는 친구들" size="small" style={{width:'90%'}}>   
                { userList.map(suggestionUser =>
                < Suggestion 
                    key={suggestionUser.username} 
                    suggestionUser={suggestionUser}
                    onFollowUser={onFollowUser}
                />
            )}
        </Card>
        </>
    )
}