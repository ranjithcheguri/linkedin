import React, { Component } from 'react';
import '../css/Profile.css';

class savedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dummyjobs: [1,,3,9,15,12,7]
        }
    }

    render() {
        var jobsList = (<div></div>);
        return(<div>
            <div className="free-space"></div>
            <div className="row">
                <div className="col-md-8">
                    <div className="col-md-12 profileCard shadow-lg ml-3">
                        <div className="pt-4 pl-3">
                            <h5> Saved Jobs List</h5>
                        </div>
                        <div className="pt-4 pl-3">
                            {jobsList}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default savedJobs;