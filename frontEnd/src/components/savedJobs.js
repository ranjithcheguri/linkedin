import React, { Component } from 'react';
import '../css/Profile.css';
import axios from 'axios';
import { IP_backEnd } from '../config/config';

class savedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('userEmail'),
            savedJobs: [],
            savedJobsDetails: []
        }
    }

    componentDidMount = async () => {
        await this.getsavedJobsList();
        //await this.getSavedJobDetails();

        setTimeout(() => {
            this.getSavedJobDetails();
        }, 1000);
    }

    getSavedJobDetails = () => {
        const data = {
            "savedJobs": this.state.savedJobs
        }
        console.log("retrieveing the job details of...", data);
        axios.post(IP_backEnd + '/getSavedJobs', data)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    savedJobsDetails: res.data.result
                })
            })
    }

    getsavedJobsList = () => {
        axios.get(IP_backEnd + '/userProfile/?email=' + this.state.email)
            .then((res) => {
                console.log("SAVED JOBS LIST RECEIVED ", res.data[0]);
                this.setState({
                    savedJobs: res.data[0].savedJobs
                })
            });
    }


    displayJob = () => {
        //this.props.history.push("/jobDisplay")
    }

    render() {
        console.log(this.state.savedJobsDetails);
        if (this.state.savedJobsDetails) {
            var jobsList = this.state.savedJobsDetails.map(job => {
                return (<div className="row col-md-12 paddingTop ">
                    <div className="col-md-2"><img></img></div>
                    <div className="col-md-10  skills">
                        <a onClick={this.displayJob()}>
                            <div className="col-md-12"><h5>{job.title}</h5></div>
                            <div className="col-md-12">{job.company}</div>
                            <div className="col-md-12">{job.location}</div>
                        </a>
                    </div>
                </div>);
            })
        } else {
            var jobsList = (<div>Loading...</div>)
        }

        return (<div className="container">
            <div className="free-space"></div>
            <div className="row container">
                <div className="col-md-10">
                    <div className="col-md-12 profileCard shadow-lg ml-3">
                        <div className="pt-4 pl-3">
                            <h2> Saved Jobs List</h2>
                        </div>
                        <div className="pt-2 pl-3">
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