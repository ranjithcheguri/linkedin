import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './RecHomeNavbar';


class PostAJob extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }
    render() {
        return (
            <div>
                <Navbar/>
                <h4>In Recruiter Post A Job Page</h4>
            </div>
        );
    }
}
export default PostAJob;
