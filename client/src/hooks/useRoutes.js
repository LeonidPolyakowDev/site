import React from 'react'
import {Switch, Route, Redirect, Link, useRouteMatch, useParams} from 'react-router-dom'
import MainViewport from "../components/MainViewport";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

export default (isAuth) => {
    if (isAuth)
        return (
            <MainViewport/>
        )
    else
        return (
            <Switch>
                <Route path="/signin" exact>
                    <Signin/>
                </Route>
                <Route path="/signup" exact>
                    <Signup/>
                </Route>
                <Redirect to="/signin"/>
            </Switch>
        )
}
