import React, { Component } from 'react';
import '../css/Profile.css';
import Footer from './Footer';
import Loading from './Loading';
import { IP_backEnd } from '../config/config';
import axios from 'axios';
import { PDFViewer } from 'mgr-pdf-viewer-react';
import PDF from 'react-pdf-js';


class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "abcd1@gmail.com",
            personalProfile: {
                firstName: "username",
                lastName: "lastname",
                headLine: "headline comes here",
                city: "SAN JOSE",
                country: "ujbekistaaaaan",
                zipcode: "",
                contactInfo: "contactInfo",
                summary: "summary comes here",
                views: 0
            },
            experience: {
                designation: "Please Enter your experience details",
                company: "",
                empStart: "",
                empEnd: "",
                empCity: "",
                empCountry: ""
            },
            education: {
                college: "Please Enter your education details",
                major: "",
                eduStart: "",
                eduEnd: ""
            },
            skills: "",
            generateSkillFlag: true,
            isLoading: true,
            profilePic: "",
            resume: ''
        }
    }

    componentDidMount = async () => {
        console.log("Skills details in component did mount", this.state.skills)
        await this.getProfileData();
        this.getProfilePic();
        this.getResume();
        // this.setState({
        //     isLoading:false
        // })
        setTimeout(() => this.setState({ isLoading: false }), 1000);
    }

    getProfilePic = () => {
        console.log("fetching user profile pic...");
        axios.get(IP_backEnd + '/userProfile/getProfilePic/?email=' + this.state.email)
            .then((res) => {
                console.log("response from AWS S3 bucket... ", res.data);
                this.setState({
                    profilePic: res.data
                })
            })
    }

    onProfileClick = () => {
        //console.log("inside profile click...")
    }

    getProfileData = async () => {
        await axios.get(IP_backEnd + '/userProfile/?email=' + this.state.email)
            .then(response => {
                console.log("profile details retrieved", response.data[0]);
                this.setState({
                    ...response.data[0]
                })
            })
    }

    getResume = () => {
        console.log("fetching user resume");
        axios.get(IP_backEnd + '/userProfile/getResume/?email=' + this.state.email)
            .then((res) => {
                console.log("Resume from AWS S3 bucket... ", res.data);
                this.setState({
                    resume: res.data
                })
            })
    }

    submitResume = async () => {
        //this.setState({ resume: "" });
        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('resume', this.state.resume);
        console.log("resume file :: before uploading ::", this.state.resume);
        await axios.post(IP_backEnd + '/applicant/updateProfile/resumeUpload', formData)
            .then((response) => {
                console.log(response.data);
            });
        //this.getProfilePic();
        console.log("after uploading Resume");
        setTimeout(() => this.getResume(), 1500);
    }

    handleResumeChange = (e) => {
        if (e.target.name == 'resume') {
            this.setState({
                resume: e.target.files[0]
            })
        }
    }

    submitProfilePic = () => {

        this.setState({ profilePic: "" });

        console.log(this.state.profilePic);
        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('profilePic', this.state.profilePic);
        console.log("before setting profile pic")
        axios.post(IP_backEnd + '/applicant/updateProfile/profilePicUpload', formData)
            .then((response) => {
                console.log(response.data);
            });
        //this.getProfilePic();
        console.log("after setting profile pic")
        setTimeout(() => this.getProfilePic(), 1500);
    }


    handleProfilePicChange = (e) => {
        if (e.target.name == 'profilePic') {
            this.setState({
                profilePic: e.target.files[0]
            })
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
        console.log(this.state.skills);
        this.setState({
            generateSkillFlag: false,
        })
        this.setState({
            skills: event.target.value
        })
    }

    submitPersonalProfile = async () => {
        console.log("personal profile data : ", this.state);
        await axios.put(IP_backEnd + '/applicant/updateProfile', this.state)
            .then(response => {
                console.log(response);
            });
        await this.getProfileData();
    }

    submitExperienceDetails = async () => {
        console.log(this.state);
        await axios.put(IP_backEnd + '/applicant/updateProfile', this.state)
            .then(response => {
                console.log(response);
            });
        await this.getProfileData();
    }

    submitEducationDetails = async () => {
        console.log(this.state);
        await axios.put(IP_backEnd + '/applicant/updateProfile', this.state)
            .then(response => {
                console.log(response);
            });
        await this.getProfileData();
    }

    submitSkillsDetails = async () => {
        console.log(this.state);
        this.setState({
            generateSkillFlag: true,
        })
        await axios.put(IP_backEnd + '/applicant/updateProfile', this.state)
            .then(response => {
                console.log(response);
            });
    }

    render() {
        var profilePicDiv;
        if (this.state.profilePic) {
            console.log("data is present in this.state.profilePic");
            profilePicDiv = (<div className="profilePic">
                <img className="img-fluid" onClick={this.onProfileClick} data-toggle="modal" src={'data:image/jpeg;base64,' + this.state.profilePic} data-target="#profilePicUpload" ></img>
            </div>)
        } else {
            profilePicDiv = (<div className="profilePic">
                <img className="img-fluid" onClick={this.onProfileClick} data-toggle="modal" data-target="#profilePicUpload" ></img>
            </div>)
        }

        var resumeDiv;
        if (this.state.resume) {
            var pdf = `data:application/pdf;base64,${this.state.resume}`;
            resumeDiv = (
                <div>
                    <PDF file={pdf} />
                </div>
            );
        } else {
            resumeDiv = (
                <div>
                    <p>No resume found</p>
                </div>
            );
        }


        var skillsList = this.state.skills;
        skillsList = skillsList.toString().split(',');
        //console.log("skills List", skillsList);
        var generateSkills;
        if (this.state.generateSkillFlag) {
            generateSkills = skillsList.map((item, index) => {
                //console.log(item);
                return (<div className="column col-md-12 mr-auto borderRed">
                    <p className="skills" >{item}</p>
                </div>);
            })
        } else {
            generateSkills = (<div>updating skills...</div>)
        }


        if (this.state.isLoading) {
            return (
                <div>
                    <Loading />
                </div>
            )
        } else {
            return (
                <div className="profilePageBody" >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 column paddingBottom">
                                <div className=" profileCard borderMe">
                                    <div className="coverPic">
                                        <img className="img-fluid"></img>
                                    </div>
                                    <div className="row borderMe">
                                        {profilePicDiv}
                                        <div className="ml-auto paddingTop zoomMe">
                                            <i className="fal fa-pen editIcon marginRight2  broderRed" data-toggle="modal" data-target="#profileSummaryModal" ></i>
                                        </div>
                                    </div>
                                    <div className="row insideCard" style={{ "marginTop": 10 + 'px' }}>
                                        <div className="col-md-8 borderMe">
                                            <h3>{this.state.personalProfile.firstName}{' '}{this.state.personalProfile.lastName}</h3>
                                            <p>{this.state.personalProfile.headLine}</p>
                                            <p><span>{this.state.personalProfile.city}</span><span>{','}{this.state.personalProfile.country}</span></p>
                                        </div>
                                        <div className="col-md-4 borderMe">
                                            <a><p><i class="fal fa-university profileIcons"></i><span>{' '}{this.state.education.college}</span></p></a>
                                            <a><p><i class="fal fa-address-book profileIcons"></i><span>{' '}{' '}{this.state.personalProfile.contactInfo}</span></p></a>
                                            <a><i className="fal fa-users profileIcons"></i><span>{' '}{'connections count'}</span></a>
                                        </div>
                                    </div>
                                    <div className="row insideCard" style={{ "marginTop": -5 + 'px' }}>
                                        <div className="dropdown borderMe" >
                                            <button className="btn btn-primary linkedInBtn dropdown-toggle marginLeft" type="button" data-toggle="dropdown">Add profile section</button>
                                            <div className="dropdown-menu profileCard marginLeft">
                                                <a className="dropdown-item" href="#">Link 1</a>
                                                <a className="dropdown-item" href="#">Link 2</a>
                                                <a className="dropdown-item" href="#">Link 3</a>
                                            </div>
                                        </div>
                                        <div className="mr-auto  borderMe">
                                            <button className="btn btn-outline-dark linkedInBtn marginLeft" data-toggle="modal" data-target="#viewResume"> view resume</button>
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
                                        <p className=""><i>{this.state.personalProfile.views}</i></p>
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
                                                <h6>{this.state.experience.designation}</h6>
                                                <i><p>{this.state.experience.company}</p></i>
                                                <p>{this.state.experience.empStart} {'--'} {this.state.experience.empEnd}</p>
                                                <p>{this.state.experience.empCity}{','}{this.state.experience.empCountry}{'.'}</p>
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
                                                <h6>{this.state.education.college}</h6>
                                                <i><p>{this.state.education.major}</p></i>
                                                <p>{this.state.education.eduStart} {'--'} {this.state.education.eduEnd}</p>
                                                {/* <p>{this.state.education.}{','}{this.state.experience.empCountry}{'.'}</p> */}
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
                                            {generateSkills}
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
                                                <input type="text" id="" className="form-control" name="firstName" value={this.state.personalProfile.firstName} onChange={this.handlePersonalProfileChange}></input>
                                            </div>
                                            <div class="column paddingLeft">
                                                <label className="">Last Name</label>
                                                <input type="text" id="" className="form-control" name="lastName" value={this.state.personalProfile.lastName} onChange={this.handlePersonalProfileChange}></input>
                                            </div>
                                        </div>
                                        <div class="row marginTop">
                                            <div class="col">
                                                <label className="">Headline</label>
                                                <textarea id="" className="form-control" rows="3" value={this.state.personalProfile.headLine} name="headLine" onChange={this.handlePersonalProfileChange} />
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
                                                        <input type="text" id="" className="form-control" name="designation" value={this.state.experience.designation} onChange={this.handleExperienceChange}></input>
                                                    </div>
                                                    <div class="column paddingLeft">
                                                        <label className="">Company</label>
                                                        <input type="text" id="" className="form-control" name="company" value={this.state.experience.company} onChange={this.handleExperienceChange}></input>
                                                    </div>
                                                </div>
                                                <div class="row paddingLeft">
                                                    <div class="column">
                                                        <label className="">Start</label>
                                                        <input type="text" id="" className="form-control" name="empStart" value={this.state.experience.empStart} onChange={this.handleExperienceChange}></input>
                                                    </div>
                                                    <div class="column paddingLeft">
                                                        <label className="">End</label>
                                                        <input type="text" id="" className="form-control" name="empEnd" value={this.state.experience.empEnd} onChange={this.handleExperienceChange}></input>
                                                    </div>
                                                </div>
                                                <div class="row paddingLeft">
                                                    <div class="column">
                                                        <label className="">City</label>
                                                        <input type="text" id="" className="form-control" name="empCity" value={this.state.experience.empCity} onChange={this.handleExperienceChange}></input>
                                                    </div>
                                                    <div class="column paddingLeft">
                                                        <label className="">Country</label>
                                                        <input type="text" id="" className="form-control" name="empCountry" value={this.state.experience.empCountry} onChange={this.handleExperienceChange}></input>
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
                                                        <input type="text" id="" className="form-control" rows="3" name="college" value={this.state.education.college} onChange={this.handleEducationChange} />
                                                    </div>
                                                </div>
                                                <div class="row marginTop">
                                                    <div class="col-md-12">
                                                        <label className="">Major</label>
                                                        <input type="text" id="" className="form-control" rows="3" name="major" value={this.state.education.major} onChange={this.handleEducationChange} />
                                                    </div>
                                                </div>
                                                <div class="row paddingLeft">
                                                    <div class="column">
                                                        <label className="">Start</label>
                                                        <input type="text" id="" className="form-control" name="eduStart" value={this.state.education.eduStart} onChange={this.handleEducationChange}></input>
                                                    </div>
                                                    <div class="column paddingLeft">
                                                        <label className="">End</label>
                                                        <input type="text" id="" className="form-control" name="eduEnd" value={this.state.education.eduEnd} onChange={this.handleEducationChange}></input>
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
                                                    <input type="text" id="" className="form-control" id="skillsList" name="skills" onClick={this.submitSkillsDetails} onChange={this.handleSkillsChange} />
                                                    <button type="button" data-toggle="collapse" data-target="#skillsCollapse" className=" btn btn-primary linkedInBtn marginTop" onClick={this.submitSkillsDetails}>add</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row paddingLeft">
                                            <div class="column">
                                                <label className="">Country</label>
                                                <input type="text" id="" className="form-control" name="country" value={this.state.personalProfile.country} onChange={this.handlePersonalProfileChange}></input>
                                            </div>
                                            <div class="column paddingLeft">
                                                <label className="">Zipcode</label>
                                                <input type="text" id="" className="form-control" name="zipcode" value={this.state.personalProfile.zipcode} onChange={this.handlePersonalProfileChange}></input>
                                            </div>
                                        </div>
                                        <div class="row marginTop">
                                            <div class="col-md-12">
                                                <label className="">Contact info</label>
                                                <input type="text" id="" className="form-control" rows="3" name="contactInfo" value={this.state.personalProfile.contactInfo} onChange={this.handlePersonalProfileChange} />
                                            </div>
                                        </div>
                                        <div class="row marginTop">
                                            <div class="col-md-12">
                                                <label className="">Summary</label>
                                                <textarea id="" className="form-control" rows="3" name="summary" value={this.state.personalProfile.summary} onChange={this.handlePersonalProfileChange} />
                                            </div>
                                        </div>
                                        <div class="row marginTop marginBottom">
                                            <div class="col-md-8 marginTop">
                                                <input type="file" id="" className="form-control" name="resume" onChange={this.handleResumeChange} />
                                            </div>
                                            <div className="mr-auto marginTop ">
                                                <button className="btn btn-outline-dark linkedInBtn" onClick={this.submitResume}>Upload Resume</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary linkedInBtn" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary linkedInBtn" onClick={this.submitPersonalProfile} data-dismiss="modal">Save changes</button>
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
                                        <div class="row paddingLeft">
                                            <div class="column">
                                                <label className="">Desgination</label>
                                                <input type="text" id="" className="form-control" name="designation" value={this.state.experience.designation} onChange={this.handleExperienceChange}></input>
                                            </div>
                                            <div class="column paddingLeft">
                                                <label className="">Company</label>
                                                <input type="text" id="" className="form-control" name="company" value={this.state.experience.company} onChange={this.handleExperienceChange}></input>
                                            </div>
                                        </div>
                                        <div class="row paddingLeft">
                                            <div class="column">
                                                <label className="">Start</label>
                                                <input type="text" id="" className="form-control" name="empStart" value={this.state.experience.empStart} onChange={this.handleExperienceChange}></input>
                                            </div>
                                            <div class="column paddingLeft">
                                                <label className="">End</label>
                                                <input type="text" id="" className="form-control" name="empEnd" value={this.state.experience.empEnd} onChange={this.handleExperienceChange}></input>
                                            </div>
                                        </div>
                                        <div class="row paddingLeft">
                                            <div class="column">
                                                <label className="">City</label>
                                                <input type="text" id="" className="form-control" name="empCity" value={this.state.experience.empCity} onChange={this.handleExperienceChange}></input>
                                            </div>
                                            <div class="column paddingLeft">
                                                <label className="">Country</label>
                                                <input type="text" id="" className="form-control" name="empCountry" value={this.state.experience.empCountry} onChange={this.handleExperienceChange}></input>
                                            </div>
                                        </div>
                                        <div className="row paddingLeft">
                                            <button type="button" data-toggle="collapse" data-target="#experienceCollapse" className=" btn btn-primary linkedInBtn marginTop  ml-auto" onClick={this.submitExperienceDetails}>add</button>
                                        </div>
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
                                        <div class="row marginTop">
                                            <div class="col-md-12">
                                                <label className="">College</label>
                                                <input type="text" id="" className="form-control" rows="3" name="college" value={this.state.education.college} onChange={this.handleEducationChange} />
                                            </div>
                                        </div>
                                        <div class="row marginTop">
                                            <div class="col-md-12">
                                                <label className="">Major</label>
                                                <input type="text" id="" className="form-control" rows="3" name="major" value={this.state.education.major} onChange={this.handleEducationChange} />
                                            </div>
                                        </div>
                                        <div class="row paddingLeft">
                                            <div class="column">
                                                <label className="">Start</label>
                                                <input type="text" id="" className="form-control" name="eduStart" value={this.state.education.eduStart} onChange={this.handleEducationChange}></input>
                                            </div>
                                            <div class="column paddingLeft">
                                                <label className="">End</label>
                                                <input type="text" id="" className="form-control" name="eduEnd" value={this.state.education.eduEnd} onChange={this.handleEducationChange}></input>
                                            </div>
                                        </div>
                                        <div className="row paddingLeft">
                                            <button type="button" data-toggle="collapse" data-target="#educationCollapse" className=" btn btn-primary linkedInBtn marginTop  ml-auto" onClick={this.submitEducationDetails}>add</button>
                                        </div>

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
                                                <input type="text" id="" placeholder="seperate multiple skills with ." className="form-control" name="skills" value={this.state.skills} onChange={this.handleSkillsChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        {/* <button type="button" class="btn btn-secondary linkedInBtn" data-dismiss="modal">Close</button> */}
                                        <button type="button" className="btn btn-primary linkedInBtn" onClick={this.submitSkillsDetails} data-dismiss="modal">DONE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* PROFILE PIC MODAL UPLOAD 5 */}
                        <div class="modal fade" id="profilePicUpload" tabindex="-1" role="dialog" aria-labelledby="profilePicModal" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="skillsModalTitle">Upload profile pic</h5>
                                        <button type="button" class="close linkedInBtn" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row marginTop">
                                            <div class="col-md-12">
                                                <input type="file" id="" className="form-control" name="profilePic" onChange={this.handleProfilePicChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" className="btn btn-primary linkedInBtn" onClick={this.submitProfilePic} data-dismiss="modal">Upload</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* RESUME MODAL UPLOAD 5 */}
                        <div class="modal fade" id="viewResume" tabindex="-1" role="dialog" aria-labelledby="viewResumeModal" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="viewResumeTitle">Resume</h5>
                                        <button type="button" class="close linkedInBtn" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        {resumeDiv}
                                        {/* <div class="row marginTop">
                                            <div class="col-md-12">
                                                <input type="file" id="" className="form-control" name="profilePic" onChange={this.handleProfilePicChange} />
                                            </div>
                                        </div> */}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" className="btn btn-primary linkedInBtn" data-dismiss="modal">Close</button>
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
}
export default Profile;
