import {Panel} from "primereact/panel";
import React, {useContext, useEffect, useCallback} from 'react'
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import {AuthContext} from "../context/auth";
import {httpReq} from "../helpers/tokenHelper";
import {Menubar} from "primereact/menubar";
import {Link, Redirect, Route, Switch, useHistory, useParams, useRouteMatch} from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Article from "./Article";
import PostList from "./PostList";
import ArticleView from "./ArticleView";

const MainViewport = () => {
    let {path, url} = useRouteMatch();
    const {logout} = useContext(AuthContext)
    const history = useHistory();

    const handleLinkClick = useCallback((path) => history.push(path), [history]);

    const items = [
        {
            label: 'Написать пост',
            icon: 'pi pi-fw pi-pencil',
            command: () => {
                handleLinkClick('/create');
            }
        },
        {
            label: 'Все посты',
            icon: 'pi pi-fw pi-book',
            command: () => {
                handleLinkClick('/posts');
            }
        }
    ]

    const rightContents = (
        <>
            <Button onClick={logout} label="Выйти" icon="pi pi-times" className="p-button-danger"/>
        </>
    );

    return (
        <div className="p-d-flex p-flex-column full-width-height">
            <Menubar
                model={items}
                end={rightContents}
            />
            <Switch>
                <Route exact path={path}>
                    <h3>Home page</h3>
                </Route>
                <Route path={'/create'} component={Article} />
                <Route path={'/posts'} component={PostList} />
                <Route path={'/post/:id'} component={ArticleView} />
            </Switch>
        </div>
    );
}

export default MainViewport;
