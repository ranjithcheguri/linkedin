import React, { Component } from 'react';
import '../css/connections.css';
import '../css/Profile.css';
import { IP_backEnd } from '../config/config';
import axios from 'axios';

class connections extends Component {
    constructor() {
        super();
        this.state = {
            acceptedConnections: [],
            pendingConnections: [],
            acceptedCProfiles: []
        }
    }
    componentDidMount() {
        //${localStorage.getItem('email')}
        let acceptedConnections = []
        let pendingConnections = []
        let data = {
            email: "vinay@gmail.com"
        }
        let acceptedCProfiles=[]
        axios.post(IP_backEnd + `/getConnections`, data)
            .then((response) => {
                console.log("Inside Connections: ")
                console.log("Status Code: ", response.data);
                if (response.status === 200) {
                    for (var i = 0; i < response.data.length; i++) {
                        //console.log(response.data[i])
                        if (response.data[i].status == 1) {
                            acceptedConnections.push(response.data[i])
                            console.log(response.data[i])
                            let data = {
                                email: response.data[i].to
                            }
                            axios.post(IP_backEnd + `/userProfile`, data)
                                .then((response) => {
                                    console.log("Inside user Profiles: ")
                                    console.log("Status Code: ", response.data);
                                    if (response.status == 200) {
                                        acceptedCProfiles.push(response.data[0])
                                        console.log("acceptedCProfiles value: "+acceptedCProfiles)
                                    } else {
                                        console.log("not done")
                                    }
                                    //console.log("Inside complex:"+acceptedCProfiles.address)
                                }).catch(err => {
                                    console.log(err);
                                });
                        }
                        else if (response.data[i].status == 0) {
                            pendingConnections.push(response.data[i])
                        }
                    }
                    
                    console.log(acceptedConnections)
                    console.log(pendingConnections)
                    console.log("acceptedCProfiles value: "+acceptedCProfiles)
                    setTimeout(() => {
                        this.setState({
                            // ...response.data,
                            // acceptedConnections,
                            // pendingConnections
                            acceptedCProfiles
                        })
                    }, 1000);
                    
                } else {
                    console.log("Did not find the server api")
                }
                console.log(this.state)
            }).catch(err => {
                console.log(err);
            });
    }
    //<td>{c1.fName}</td>
    render() {
        //iterate over acceptedConnections to create a table row
        let details = this.state.acceptedCProfiles.map(connection => {
            return (
                
                <div className="column insideCard paddingLeft">
                <hr></hr>
                <h5>{connection.email}</h5>
                <p>{connection.address}</p>
                </div>

            )
        })
        //console.log(details)
        return (
            <div>
                <div className="free-space"></div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="col-md-12 profileCard ml-3">
                            <div className="pt-4 pl-3">
                                <h5>{this.state.acceptedCProfiles.length} Connections</h5>
                            </div>
                            {details}
                        </div>
                    </div>
                    <div className="col-md-4 mt-5 pl-5"><img src={require('../images/connectionsPage_1.JPG')}></img></div>
                </div>
            </div>
        );
    }
}

export default connections;