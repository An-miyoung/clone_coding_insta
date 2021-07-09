import React from "react";
import "./AppLayout.scss";
import {Menu} from "antd";
import LogoImage from "assets/logo2.png";

export default function AppLayout({children}) {

    return (
        <div className="app">
            <div className="header">
                <div className="page-logo">
                    <img src={LogoImage} alt="logo" style={{marginRight:'0.5em'}} />
                </div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item>회원가입</Menu.Item>
                        <Menu.Item>로그인</Menu.Item>
                        <Menu.Item>친구찾기</Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="content">
                {children}
            </div>
            <div className="footer">
                footer
            </div>
        </div>
    )
}