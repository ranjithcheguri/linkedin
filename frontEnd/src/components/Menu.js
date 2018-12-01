import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';
import connections from './connections'
import ViewAllApplicants from './ViewAllApplicants';
import ViewAllMessages from './Messages/ViewAllMessages';
import RecHome from './RecHome'
import Home from './Home';
import PostAJob from './PostAJob'

import ViewConversation from './Messages/ViewConversation';
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
                <Route exact path="/" exact component={Navbar} />
                <Route path='/viewApplicants' component={ViewAllApplicants}/>
                <Route path='/messages' component={ViewAllMessages}/>
                <Route path='/conversation' component={ViewConversation}/>
                <Route path='/recHome' component={RecHome}/>
                <Route path='/postAJob' component={PostAJob}/>
            </div>
        );
    }
}
export default Menu;