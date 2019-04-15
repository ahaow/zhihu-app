import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from './pages/home';
import Detail from './pages/detail';
import Comment from './pages/comment';
import Hotmsg from './pages/hotmsg';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/home' component={Home}></Route>
                        <Route exact path='/hot' component={Hotmsg}></Route>
                        <Route exact path='/detail' component={Detail}></Route>
                        <Route exact path='/comment' component={Comment}></Route>
                        <Redirect
                            exact
                            path="/"
                            to={{
                            pathname: '/home'
                        }}/></Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
