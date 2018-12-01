import React, { Component } from 'react';
import '../css/Profile.css';
import Footer from './Footer';
import Loading from './Loading';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            personalProfile: {
                firstName: "123245678",
                lastName: "",
                headLine: "",
                country: "",
                zipcode: "",
                contactInfo: "",
                summary: "",
                views: ""
            },
            experience: {
                designation: "",
                company: "",
                empStart: "",
                empEnd: "",
                empCity: "",
                empCountry: ""
            },
            education: {
                college: "",
                major: "",
                eduStart: "",
                eduEnd: ""
            },
            skills: []
        }
    }


    //react directly doesn't support to change nested objects, so we copy nested obj from state and change here.
    handlePersonalProfileChange = (event) => {
        console.log(event.target.name);
        this.setState({
            personalProfile: {
                ...this.state.personalProfile,
                [event.target.name]: event.target.value
            }
        })
    }

    handleExperienceChange = (event) => {
        var updatedExerperince = this.state.experience;

        this.setState({
            experience: {
                ...this.state.experience,
                [event.target.name]: event.target.value
            }
        })
    }

    handleEducationChange = (event) => {
        this.setState({
            education: {
                ...this.state.education,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSkillsChange = (event) => {
        this.setState({
            skills: event.target.value
        })
    }



    submitPersonalProfile = () => {
        console.log(this.state);
    }

    submitExperienceDetails = () => {
        console.log(this.state);
    }

    submitEducationDetails = () => {
        console.log(this.state);
    }

    submitSkillsDetails = () => {
        console.log(this.state);
    }

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
                                    <div className="ml-auto paddingTop zoomMe">
                                        <i className="fal fa-pen editIcon marginRight2  broderRed" data-toggle="modal" data-target="#profileSummaryModal" ></i>
                                    </div>
                                </div>
                                <div className="row insideCard">
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
                                        <button className="btn btn-primary linkedInBtn dropdown-toggle marginLeft" type="button" data-toggle="dropdown">Add profile section</button>
                                        <div className="dropdown-menu profileCard marginLeft">
                                            <a className="dropdown-item" href="#">Link 1</a>
                                            <a className="dropdown-item" href="#">Link 2</a>
                                            <a className="dropdown-item" href="#">Link 3</a>
                                        </div>
                                    </div>
                                    <div className="mr-auto  borderMe">
                                        <button className="btn btn-outline-dark linkedInBtn marginLeft"> more...</button>
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
                                        <div className="zoomMe  ml-auto">
                                            <i className="fal fa-pencil editIcon" data-toggle="modal" data-target="#experienceModal"></i>
                                        </div>
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
                                        <div className="zoomMe ml-auto">
                                            <i className="fal fa-pencil editIcon " data-toggle="modal" data-target="#educationModal" ></i>
                                        </div>
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
                                        <div className="zoomMe ml-auto">
                                            <i className="fal fa-pencil editIcon " data-toggle="modal" data-target="#skillsModal"></i>
                                        </div>
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

                    {/* MODELS CODE HERE */}
                    {/* PROFILE SUMMARY MODAL 1 */}
                    <div class="modal fade" id="profileSummaryModal" tabindex="-1" role="dialog" aria-labelledby="profileSummaryModalTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="profileSummaryModalTitle">Edit Profile Summary</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body form">
                                    <div class="row paddingLeft">
                                        <div class="column">
                                            <label className="">First Name</label>
                                            <input type="text" id="" className="form-control" name="firstName" onChange={this.handlePersonalProfileChange}></input>
                                        </div>
                                        <div class="column paddingLeft">
                                            <label className="">Last Name</label>
                                            <input type="text" id="" className="form-control" name="lastName" onChange={this.handlePersonalProfileChange}></input>
                                        </div>
                                    </div>
                                    <div class="row marginTop">
                                        <div class="col">
                                            <label className="">Headline</label>
                                            <textarea id="" className="form-control" rows="3" name="headLine" onChange={this.handlePersonalProfileChange} />
                                        </div>
                                    </div>
                                    <div class="row marginTop">
                                        <div class="col-md-12 cursorMe" data-toggle="collapse" data-target="#experienceCollapse">
                                            <i class="fal fa-plus-square fa-2x editIcon" ></i>
                                            <label className=""> Add Employment details</label>
                                        </div>
                                        <div className="collapse paddingLeft" id="experienceCollapse">
                                            <div class="row paddingLeft">
                                                <div class="column">
                                                    <label className="">Desgination</label>
                                                    <input type="text" id="" className="form-control" name="designation" onChange={this.handleExperienceChange}></input>
                                                </div>
                                                <div class="column paddingLeft">
                                                    <label className="">Company</label>
                                                    <input type="text" id="" className="form-control" name="company" onChange={this.handleExperienceChange}></input>
                                                </div>
                                            </div>
                                            <div class="row paddingLeft">
                                                <div class="column">
                                                    <label className="">Start</label>
                                                    <input type="text" id="" className="form-control" name="empStart" onChange={this.handleExperienceChange}></input>
                                                </div>
                                                <div class="column paddingLeft">
                                                    <label className="">End</label>
                                                    <input type="text" id="" className="form-control" name="empEnd" onChange={this.handleExperienceChange}></input>
                                                </div>
                                            </div>
                                            <div class="row paddingLeft">
                                                <div class="column">
                                                    <label className="">City</label>
                                                    <input type="text" id="" className="form-control" name="empCity" onChange={this.handleExperienceChange}></input>
                                                </div>
                                                <div class="column paddingLeft">
                                                    <label className="">Country</label>
                                                    <input type="text" id="" className="form-control" name="empCountry" onChange={this.handleExperienceChange}></input>
                                                </div>
                                            </div>
                                            <div className="row paddingLeft">
                                                <button type="button" data-toggle="collapse" data-target="#experienceCollapse" className=" btn btn-primary linkedInBtn marginTop  ml-auto" onClick={this.submitExperienceDetails}>add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row marginTop">
                                        <div class="col-md-12 cursorMe" data-toggle="collapse" data-target="#educationCollapse">
                                            <i class="fal fa-plus-square fa-2x editIcon" ></i>
                                            <label className=""> Add Education details</label>
                                        </div>
                                        <div className="collapse paddingLeft" id="educationCollapse">
                                            <div class="row marginTop">
                                                <div class="col-md-12">
                                                    <label className="">College</label>
                                                    <input type="text" id="" className="form-control" rows="3" name="college" onChange={this.handleEducationChange} />
                                                </div>
                                            </div>
                                            <div class="row marginTop">
                                                <div class="col-md-12">
                                                    <label className="">Major</label>
                                                    <input type="text" id="" className="form-control" rows="3" name="major" onChange={this.handleEducationChange} />
                                                </div>
                                            </div>
                                            <div class="row paddingLeft">
                                                <div class="column">
                                                    <label className="">Start</label>
                                                    <input type="text" id="" className="form-control" name="eduStart" onChange={this.handleEducationChange}></input>
                                                </div>
                                                <div class="column paddingLeft">
                                                    <label className="">End</label>
                                                    <input type="text" id="" className="form-control" name="eduEnd" onChange={this.handleEducationChange}></input>
                                                </div>
                                            </div>
                                            <div className="row paddingLeft">
                                                <button type="button" data-toggle="collapse" data-target="#educationCollapse" className=" btn btn-primary linkedInBtn marginTop  ml-auto" onClick={this.submitEducationDetails}>add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row marginTop">
                                        <div class="col-md-12 cursorMe" data-toggle="collapse" data-target="#skillsCollapse" >
                                            <i class="fal fa-plus-square fa-2x editIcon"></i>
                                            <label className=""> Add Skill details</label>
                                        </div>
                                        <div className="collapse paddingLeft" id="skillsCollapse">
                                            <div className="marginTop">
                                                <label className="">Skills</label>
                                                <input type="text" id="" className="form-control" name="skills" value={this.state.skills} onChange={this.handleSkillsChange} />
                                                <button type="button" data-toggle="collapse" data-target="#skillsCollapse" className=" btn btn-primary linkedInBtn marginTop" onClick={this.submitSkillsDetails}>add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row paddingLeft">
                                        <div class="column">
                                            <label className="">Country</label>
                                            <input type="text" id="" className="form-control" name="country" onChange={this.handlePersonalProfileChange}></input>
                                        </div>
                                        <div class="column paddingLeft">
                                            <label className="">Zipcode</label>
                                            <input type="text" id="" className="form-control" name="zipcode" onChange={this.handlePersonalProfileChange}></input>
                                        </div>
                                    </div>
                                    <div class="row marginTop">
                                        <div class="col-md-12">
                                            <label className="">Contact info</label>
                                            <input type="text" id="" className="form-control" rows="3" name="contactInfo" onChange={this.handlePersonalProfileChange} />
                                        </div>
                                    </div>
                                    <div class="row marginTop">
                                        <div class="col-md-12">
                                            <label className="">Summary</label>
                                            <textarea id="" className="form-control" rows="3" name="summary" onChange={this.handlePersonalProfileChange} />
                                        </div>
                                    </div>
                                    <div class="row marginTop paddingLeft">
                                        <button className="btn btn-outline-dark linkedInBtn">Upload</button>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary linkedInBtn" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary linkedInBtn" onClick={this.submitPersonalProfile}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* EXPERIENCE MODAL 2 */}
                    <div class="modal fade" id="experienceModal" tabindex="-1" role="dialog" aria-labelledby="experienceModalTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="experienceModalTitle">Edit Experience details</h5>
                                    <button type="button" class="close linkedInBtn" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row marginTop">
                                        <div class="col-md-12">
                                            <label className="">Designation</label>
                                            <input type="text" id="" className="form-control" name="designation" onChange={this.handleExperienceChange} />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary linkedInBtn" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary linkedInBtn" onClick={this.submitExperienceDetails}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* EDUCATION MODAL 3 */}
                    <div class="modal fade" id="educationModal" tabindex="-1" role="dialog" aria-labelledby="educationModalTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="educationModalTitle">Edit Education details</h5>
                                    <button type="button" class="close linkedInBtn" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <input type="text" id="" className="" name="" onChange=""></input>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary linkedInBtn" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary linkedInBtn">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SKILLS MODAL 4 */}
                    <div class="modal fade" id="skillsModal" tabindex="-1" role="dialog" aria-labelledby="skillsModalTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="skillsModalTitle">Edit Skills</h5>
                                    <button type="button" class="close linkedInBtn" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row marginTop">
                                        <div class="col-md-12">
                                            <label className="">Skills</label>
                                            <input type="text" id="" className="form-control" name="skills" value={this.state.skills} onChange={this.handleSkillsChange} />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary linkedInBtn" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary linkedInBtn" onClick={this.submitSkillsDetails}>add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div >
        );
    }
}

export default Profile;
