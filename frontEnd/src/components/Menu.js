import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';
import PostAJob from './PostAJob'
import RecHome from './RecHome'

import Home from './Home';
class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }
    render() {
        return (
            <div>
                <Route exact path="/" component={Navbar} />
                <Route path="/home" component={Home} />
                <Route path='/profile' component={Profile} />
                <Route exact path='/postAJob' component={PostAJob} />
                <Route path='/recHome' component={RecHome} />
            </div>
        );
    }
}
export default Menu;