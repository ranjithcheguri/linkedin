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


// import PostAJob from './PostAJob';
// import RecHome from './RecHome';


import JobDisplay from './JobDisplay';
import RecruiterPostJob from './RecruiterPostJob';
import Dashboard from './AdminDashboard';
import LogSaveJob from './logSavedJob';

import ViewConversation from './Messages/ViewConversation';
class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} /> 
                <Route exact path="/navbar" component={Navbar} />
                <Route path="/jobdisplay" component={JobDisplay} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/postJob" component={RecruiterPostJob} />
               
                <Route path="/logSaveJob" component={LogSaveJob} />
              
                <Route path='/profile' component={Profile} />
                <Route path='/connections' component={connections} />

                <Route exact path="/" exact component={Navbar} />
                <Route path='/viewApplicants' component={ViewAllApplicants}/>
                <Route path='/messages' component={ViewAllMessages}/>
                <Route path='/conversation' component={ViewConversation}/>
                <Route path='/recHome' component={RecHome}/>
                <Route path='/postAJob' component={PostAJob}/>

                {/* <Route exact path="/" component={Navbar} /> */}
                <Route exact path="/home" component={Home} />
              
               {/* <Route exact path='/postAJob' component={PostAJob} /> */}
                {/* <Route path='/recHome' component={RecHome} /> */}
            </div>
        );
    }
}
export default Menu;