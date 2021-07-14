import React, { useState } from "react";
import Axios from "axios";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import useLocalStorage from "utils/useLocalStorage";
import { useAppContext, setToken } from "store";


export default function Login() {
    const { dispatch } = useAppContext();
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = (values) => {
        async function fn() {
            const { username, password } = values;
            setFieldErrors({});

            const data = {username, password};
            try {
                const response = await Axios.post("http://localhost:8000/accounts/token/", data);
                const { data: { token: jwtToken }} = response;

                dispatch(setToken(jwtToken));

                notification.open({
                    message: "로그인됐습니다.",
                    icon: <SmileOutlined style={{color: "#108ee9"}} />
                });

                // history.push("/");
            }
            catch(error) {
                if (error.response) {
                    notification.open({
                        message: "로그인에 실패했습니다.",
                        description: "아이디와 비밀번호를 확인해주세요.",
                        icon: <FrownOutlined style={{color: "#ff3333"}}/>
                    });

                    const {data: fieldsErrorMessages} = error.response;
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce((
                            acc, [fieldName, errors]) => {
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" ")
                                }
                            return acc;
                            }, {}
                        )
                    );
                }
            } 
        };
       fn();
    };

    return (
        <Card title="로그인">
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                >
                <Form.Item
                    label="사용자명"
                    name="username"
                    rules={[
                        { required: true, message: '사용자명을 넣어주세요!' },
                        { min: 4, message: '4글자이상의 영문자를 입력해주세요.'}
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[
                        { required: true, message: '비밀번호를 넣어주세요!' },
                        { min: 4, message: '4글자이상의 영문자를 입력해주세요.'}
                    ]}
                    hasFeedback
                    {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{marginTop:'2rem'}}>
                    <Button type="primary" htmlType="submit">
                    로그인하기
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
    
}