import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import JobDisplay from './JobDisplay';
import RecruiterPostJob from './RecruiterPostJob';
import Dashboard from './AdminDashboard';
import LogSaveJob from './logSavedJob';
class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} /> 
                <Route path="/navbar" component={Navbar} />
                <Route path="/jobdisplay" component={JobDisplay} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/recruiterpostjob" component={RecruiterPostJob} />
                <Route path="/logSaveJob" component={LogSaveJob} />
            </div>
        );
    }
}
export default Menu;