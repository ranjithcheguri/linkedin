import React, { Component } from 'react';
import '../css/newsFeed.css';
import '../css/Profile.css';

class newsFeed extends Component {
    render() {
        return (
            <div>
                <div className="row free-space"></div>
                
                <div className="row">
                    <div></div>
                    <div className="col-md-3  ml-5 mt-3">
                        <div>
                            <center>
                                <div className="shadow w-75">
                                    <div className="coverPic1">
                                        <img className="img-fluid"></img>
                                    </div>
                                    <div className="row">
                                        <center>
                                            <div className="profilePic1" >
                                                <img className="img-fluid"></img>
                                            </div></center>
                                        <div><center>
                                            <div className="col-md-8 textSmall">

                                                <h5>Vinay Kovuri</h5>
                                                <p>Actively seeking summer'19 Internship | pursuing Master's in Software Engineering, San Jose State University.</p>
                                                <p><span>San Jose</span><span>, California</span></p>
                                                <hr></hr>
                                                <p>Connections &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80</p>
                                            </div></center>
                                        </div>

                                    </div>


                                </div>
                            </center>
                        </div>
                        <center>
                            <div className="container2">
                                <img className="Feeds img-fluid shadow" src={require('../images/newsFeed5.JPG')}></img>
                            </div>
                        </center>
                    </div>
                    <div className="col-md-5 container1">
                        <img className="Feeds img-fluid shadow " src={require('../images/newsFeed6.JPG')}></img>
                        <hr className="wchange"></hr>
                        <img className="Feeds img-fluid shadow" src={require('../images/newsFeed2.JPG')}></img>
                        <img className="Feeds img-fluid shadow" src={require('../images/newsFeed3.JPG')}></img>
                    </div>
                    <div className="col-md-3 container1">
                        <img className="Feeds img-fluid" src={require('../images/newsFeed.JPG')}></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default newsFeed;