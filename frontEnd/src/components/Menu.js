import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }
    render() {
        return (
            <div>
                {/* <Route exact path="" component={LandingPage2} />
                <Route path="/" component={Navbar} /> */}
            </div>
        );
    }
}
export default Menu;