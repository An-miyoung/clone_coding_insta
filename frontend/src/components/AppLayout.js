import React from "react";
import "./AppLayout.scss";
import {Menu} from "antd";
import LogoImage from "assets/logo2.png";
import { Link } from "react-router-dom";

export default function AppLayout({children}) {

    return (
        <div className="app">
            <div className="header">
                <div className="page-logo">
                    <Link to={{ pathname: "/"}}>
                        <img src={LogoImage} alt="logo" style={{marginRight:'0.5em'}} />
                    </Link>
                </div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item>
                            <Link to={{ pathname: "/accounts/signup"}}>회원가입</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={{ pathname: "/accounts/login"}}>로그인</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={{ pathname: "/accounts/friend"}}>친구추천</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="content">
                {children}
            </div>
            <div className="footer">
                &copy; 2021. PlusBogi
            </div>
        </div>
    )
}