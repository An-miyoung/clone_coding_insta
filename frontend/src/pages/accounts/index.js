import React from "react";
import {Route} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import Friend from "./Friend";
import LoginRequiredRoute from "utils/LoginRequiredRoute";

export default function Routes({match}) {
    return (
        <>
            <LoginRequiredRoute exact path={match.url+"/profile"} component={Profile} />
            <Route exact path={match.url+"/signup"} component={Signup} />
            <Route exact path={match.url+"/login"} component={Login} />
            <LoginRequiredRoute exact path={match.url+"/friend"} component={Friend} />
        </>
    )
}