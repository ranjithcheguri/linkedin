import React, { Component } from 'react';
import '../css/Profile.css';
import Footer from './Footer';
import Loading from './Loading';

class Profile extends Component {
    render() {
        return (
            <div className="profilePageBody">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 column paddingBottom">
                            <div className=" profileCard borderMe">
                                <div className="coverPic">
                                    <img className="img-fluid"></img>
                                </div>
                                <div className="row borderMe">
                                    <div className="profilePic" >
                                        <img className="img-fluid"></img>
                                    </div>
                                    <div className="ml-auto marginRight marginTop">
                                        <i className="fal fa-pen editIcon broderRed"></i>
                                    </div>
                                </div>
                                <div className="row insideCard ">
                                    <div className="col-md-8 borderMe">
                                        <h3>Ranjith Cheguri</h3>
                                        <p>Actively seeking summer'19 Internship | pursuing Master's in Software Engineering, San Jose State University.</p>
                                        <p><span>San Jose</span><span>, California</span></p>
                                    </div>
                                    <div className="col-md-4 borderMe">
                                        <a><p><i class="fal fa-university profileIcons"></i><span>   University/Company</span></p></a>
                                        <a><p><i class="fal fa-address-book profileIcons"></i><span>    Contact Info</span></p></a>
                                        <a><i className="fal fa-users profileIcons"></i><span>   See Connections</span></a>
                                    </div>
                                </div>
                                <div className="row insideCard">
                                    <div className="dropdown borderMe">
                                        <button className="btn btn-primary dropdown-toggle marginLeft" type="button" data-toggle="dropdown">Add profile section</button>
                                        <div className="dropdown-menu profileCard marginLeft">
                                            <a className="dropdown-item" href="#">Link 1</a>
                                            <a className="dropdown-item" href="#">Link 2</a>
                                            <a className="dropdown-item" href="#">Link 3</a>
                                        </div>
                                    </div>
                                    <div className="mr-auto  borderMe">
                                        <button className="btn btn-outline-dark marginLeft"> more...</button>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-12 dashboardCard">
                                <h4>Your Dashboard</h4>
                                <img className="dashboardBg" src={require('../images/dashboard.png')}>
                                </img>
                                <div className="viewsCard">
                                    <h2>190</h2>
                                    <p>profile views</p>
                                </div>
                            </div> */}

                            <div className="col-md-12 profileCard">
                                <div className="column insideCard paddingLeft">
                                    <h4>Your Dashboard</h4>
                                    <p><i>private to you</i></p>
                                    <p className=""><i>109</i></p>
                                    <p>Who viewed your profile</p>
                                </div>
                            </div>
                            <div className="col-md-12 profileCard">
                                <div className="col-md-12 row insideCard">
                                    <div className="row col-md-12">
                                        <h4>Experience</h4>
                                        <i className="fal fa-pencil editIcon ml-auto"></i>
                                    </div>
                                    <div className="row col-md-12 paddingTop">
                                        <img className="expImg " src={require('../images/employement.jpg')}></img>
                                        <div className="column paddingLeft">
                                            <h6>Associate Software Engineer</h6>
                                            <i><p>Accenture</p></i>
                                            <p>Nov 2016 -- May 2018</p>
                                            <p>Hyderabad,India.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 profileCard">
                                <div className="col-md-12 row insideCard">
                                    <div className="row col-md-12">
                                        <h4>Education</h4>
                                        <i className="fal fa-pencil editIcon ml-auto"></i>
                                    </div>
                                    <div className="row col-md-12 paddingTop">
                                        <img className="expImg " src={require('../images/education.png')}></img>
                                        <div className="column paddingLeft">
                                            <h6>San Jose State University</h6>
                                            <i><p>Masters in Software Engineering</p></i>
                                            <p>Nov 2018 -- May 2020</p>
                                            <p>San Jose, California.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 profileCard">
                                <div className="col-md-12 row insideCard">
                                    <div className="row col-md-12">
                                        <h4>Skills and Endorsements</h4>
                                        <i className="fal fa-pencil editIcon ml-auto"></i>
                                    </div>
                                    <div className="row col-md-12 paddingTop">
                                        <div className="column col-md-12 mr-auto borderRed">
                                            <p className="skills" >React.js</p>
                                            <p className="skills" >Node.js</p>
                                            <p className="skills" >Javascript</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 column">
                            <div className=" borderMe">
                                <img className="dummyImage1" src={require('../images/Capture1.PNG')}></img>
                            </div>
                            <div className="borderMe">
                                <img className="dummyImage2" src={require('../images/Capture2.PNG')}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Profile;
