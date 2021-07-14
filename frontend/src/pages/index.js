import React from "react";
import { Route } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "./Home";
import AccountRoutes from "./accounts";

export default function Root() {
    return (
        <AppLayout>
            {/* 나중에는 LoginRequiredRoute로 바꿀것 */}
            <Route exact path="/" component={Home} />
            <Route path="/accounts" component={AccountRoutes} />
        </AppLayout>
    )
    
}