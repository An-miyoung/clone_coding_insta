import React, { useState } from "react";
import { axiosInstance } from "api";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

export default function Signup() {
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});
    
    const onFinish = (values) => {
        async function fn() {
            const { username, password } = values;
            setFieldErrors({});

            const data = {username, password};
            try {
                await axiosInstance.post("/accounts/signup/", data);
                notification.open({
                    message: "회원가입 됐습니다.",
                    description: "로그인으로 이동합니다.",
                    icon: <SmileOutlined style={{color: "#108ee9"}} />
                });

                history.push("/accounts/login");
            }
            catch(error) {
                if (error.response) {
                    notification.open({
                        message: "회원가입에 실패했습니다.",
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
        <Card title="회원가입" style={{width:'90%', marginLeft:'0.5em'}}>
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
                    회원가입
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
    
}