import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';
import connections from './connections'

import Home from './Home';
class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }
    render() {
        return (
            <div>
                <Route path="/home" component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/connections' component={connections} />
            </div>
        );
    }
}
export default Menu;