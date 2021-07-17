import React, { useState }from "react";
import Axios from "axios";
import { Button, Form, Input, Modal, Upload, notification } from "antd";
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "utils/base64";
import { useAppContext } from "store";
import { parseErrorMessages } from "utils/ErrorForms";
import { useHistory } from "react-router";

export default function PostNewForm() {
    const history = useHistory();
    const { store : { jwtToken }} = useAppContext();
    const headers = { Authorization: `JWT ${jwtToken}` };

    const [fieldErrors, setFieldErrors] = useState({});
    const [fileList, setFileList] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null
    });

    const handleFinish = async fieldValues => {
        const { caption, location, photo: { fileList } } = fieldValues;
        
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("location", location);
        fileList.forEach((file) => {
            formData.append("photo", file.originFileObj);
        })
        try {
            const response = await Axios.post("http://localhost:8000/api/posts/", formData, { headers });
            history.push("/");
        }
        catch(error) {
            if (error.response) {
                const { status, data: fieldsErrorMessages } = error.response;
                if (typeof fieldsErrorMessages === "string" ) {
                    notification.open({
                        message: "서버 오류",
                        description: `에러) ${status} 에러가 발생했습니다.`,
                        icon: <FrownOutlined style={{color: "#ff3333"}}/>
                    });
                }
                else {
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const handlePreviewPhoto = async file => {
        if ( !file.url && !file.preview) {
            file.preview = await getBase64FromFile(file.originFileObj);
        }
        setPreviewPhoto({
            visible : true,
            base64 : file.url || file.preview
        });
    };
    
    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleFinish}
            >
            <Form.Item
                label="사진"
                name="photo"
                rules={[
                    { required: true, message: '사진을 입력해주세요.'}
                ]}
                hasFeedback
                {...fieldErrors.photo}
                {...fieldErrors.non_field_errors}
            >
                <Upload 
                    listType="picture-card" 
                    fileList={fileList}
                    // upload는 submit 버튼을 누를때 한꺼번에 하기 위해
                    beforeUpload={() => {
                        return false;
                    }}
                    onChange={handleUploadChange}
                    onPreview={handlePreviewPhoto}
                >
                    {fileList.length > 0 ? null : 
                        <div>
                            <PlusOutlined />
                            <div className="ant-upload-text">
                                Upload
                            </div>
                        </div>
                    }
                    
                </Upload>
            </Form.Item>
            <Form.Item
                label="글"
                name="caption"
                rules={[
                    { required: true, message: '사진에 대해 얘기해주세요' }
                ]}
                hasFeedback
                {...fieldErrors.caption}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="위치"
                name="location"
                rules={[
                    { required: true, message: '사진관련 장소를 입력해주세요' }
                ]}
                hasFeedback
                {...fieldErrors.location}
                {...fieldErrors.non_field_errors}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{marginTop:'2rem'}}>
                <Button type="primary" htmlType="submit" >
                올리기
                </Button>
            </Form.Item>

            <Modal
                visible={previewPhoto.visible}
                footer={null}
                onCancel={() => setPreviewPhoto({visible:false})}
            >
                <img src={previewPhoto.base64} alt="preview" style={{width:'100%'}}/>
            </Modal>
        </Form>
    )
};