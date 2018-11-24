import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';

import Home from './Home';
class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
                <Route path="/home" component={Home} />
                <Route path='/profile' component={Profile} />
            </div>
        );
    }
}
export default Menu;