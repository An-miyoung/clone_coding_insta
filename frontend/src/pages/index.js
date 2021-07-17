import React from "react";
import { Route } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "./Home";
import AccountRoutes from "./accounts";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import PostNew from "./PostNew";

export default function Root() {
    return (
        <AppLayout>
            {/* 나중에는 LoginRequiredRoute로 바꿀것 */}
            <Route exact path="/" component={Home} />
            <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
            <Route path="/accounts" component={AccountRoutes} />
        </AppLayout>
    )
    
}