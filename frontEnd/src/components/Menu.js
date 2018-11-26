import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';
import ViewAllApplicants from './ViewAllApplicants';
import ViewAllMessages from './Messages/ViewAllMessages';

import Home from './Home';
import ViewConversation from './Messages/ViewConversation';
class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }
    render() {
        return (
            <div>
                <Route exact path="/" component={Navbar} />
                <Route exact path="/home" component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/viewApplicants' component={ViewAllApplicants}/>
                <Route path='/messages' component={ViewAllMessages}/>
                <Route path='/conversation' component={ViewConversation}/>
            </div>
        );
    }
}
export default Menu;