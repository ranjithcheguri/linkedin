import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
            </div>
        );
    }
}
export default Menu;