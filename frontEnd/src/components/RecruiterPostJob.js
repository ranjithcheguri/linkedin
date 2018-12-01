import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom';
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'
class RecruiterPostJob extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            company:"",
            location:"",
            title:"",
            jobfunction:"",
            industry:"",
            employementtype:"",
            seniorlevel:"",
            jobdescribe:"",
            companyurl:"",
            typeofapply:"",
            companylogo:""
         }
         this.handleEvent=this.handleEvent.bind(this);
        this.handleRadio=this.handleRadio.bind(this);
        this.submitJobPost=this.submitJobPost.bind(this);
    }

    onFileSelect =(e)=>{
        const files = e.target.files
        console.log(files)
        this.setState({
            photos:files
        });
    }

    onSubmitForm =(e) =>{
        console.log("here in form");
        let formData = new FormData();
        const files = this.state.photos;
        console.log(files.originalname)
        for(var i=0;i<files.length;++i){
            formData.append("files",files[i]);
        }
        this.setState({pid:true})
        const config= {
            headers:{
                'content-type':'multipart/form-data'
            }
        }
    }

    handleEvent(e){
        let target=e.target;
        let value=target.value;
        let name=target.name;
        this.setState({
            [name]:value,
          
        });
        
        console.log("Hello")
    }

    handleRadio(e){
        let target=e.target;
        let value=target.value;
        let name=target.name;
        this.setState({
            typeofapply:value,
          
        });
        
        console.log("Hello")
    }

    submitJobPost(){
        const data={
            company:this.state.company,
            location:this.state.location,
            title:this.state.title,
            jobfunction:this.state.jobfunction,
            industry:this.state.industry,
            employementtype:this.state.employementtype,
            seniorlevel:this.state.seniorlevel,
            jobdescribe:this.state.jobdescribe,
            companyurl:this.state.companyurl,
            typeofapply:this.state.typeofapply
        }
        this.props.submitJobPost(data)
    }

    render() { 
        var tempDate = new Date();
        console.log(tempDate)
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        const currDate = "Current Date= "+date;
        console.log(currDate)

        return ( <div >
             <div className="row bg-light">
             <div class="col-sm-3 col-md-6 col-lg-7 border ml-5 mt-5 bg-white mb-5" >
                   
                    <h4 className="mt-3">Step 1: What job do you want to post?</h4>

                    {/* company. job title and location */}
                    <div className="row mt-4">
                    <div className="col-sm-3 col-md-6 col-lg-4 ">
                        <div>Company <sup className="text-primary"> *</sup></div>
                        <input type="text" name="company" onChange={this.handleEvent} className="h-100 w-100 pl-2 pr-2 "></input>
                    </div>
                    <div className="col-sm-3 col-md-6 col-lg-4 ">
                        <div ><small>Job Title<sup className="text-primary"> *</sup></small></div>
                        <input type="text" name="title" onChange={this.handleEvent} className="h-100 w-100 pl-2 pr-2"></input>
                    </div>
                    <div className="col-sm-3 col-md-6 col-lg-4 ">
                        <div ><small>Location<sup className="text-primary"> *</sup> </small></div>
                        <input type="text" name="location" onChange={this.handleEvent} className="h-100 w-100 pl-2 pr-2"></input></div>
                    </div>

                    {/* Job function, employemnet type */}
                    <div className="row mt-4">
                    <div className="col-sm-3 col-md-6 col-lg-8 mt-3 ">
                        <div ><small>Job function(Select up to 3)<sup className="text-primary"> *</sup></small></div>
                        <input type="text" name="jobfunction" onChange={this.handleEvent} className="h-100 w-100 pl-2 pr-2 pl-2"></input>
                    </div>
                    <div className="col-sm-3 col-md-6 col-lg-4 mt-3  ">
                        <div ><small>Employement type <sup className="text-primary"> *</sup></small></div>
                        <select className="w-100 h-100" name="employementtype" onClick={this.handleEvent} onClick={this.handleEvent}>
                            <option disabled selected value> Choose type ...</option>
                                <option value="fulltime">Full-time</option>
                                <option value="parttime">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="temporary">Temporary</option>
                                <option value="volunteer">Volunteer</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                    </div>

                     {/* Company industry */}
                     <div className="row mt-4">
                    <div className="col-sm-3 col-md-6 col-lg-8 mt-3 ">
                        <div ><small>Company industry(Select up to 3)<sup className="text-primary"> *</sup></small></div>
                        <input type="text" name="industry" className="h-100 w-100 pl-2 pr-2" onChange={this.handleEvent}></input>
                    </div>
                    <div className="col-sm-3 col-md-6 col-lg-4 mt-3  ">
                        <div ><small>Seniority Level<sup className="text-primary"> *</sup></small> </div>
                        <select className="w-100 h-100" onChange={this.handleEvent} name="seniorlevel" onClick={this.handleEvent}>
                            <option disabled selected value> Choose type ...</option>
                                <option value="internship">Internship</option>
                                <option value="entrylevel">Entry level</option>
                                <option value="associate">Associate</option>
                                <option value="midseniorlevel">Mid-Senior level</option>
                                <option value="director">Director</option>
                                <option value="executive">Executive</option>
                                <option value="notapplicable">Not applicable</option>
                            </select>
                            </div>
                    </div>


                    {/* Job Description */}
                    <div className="mt-5">
                        <div className=""><small>Job Description</small><sup className="text-primary"> *</sup></div>
                        <textarea rows="4" cols="88.5" onChange={this.handleEvent} name="jobdescribe" className="pl-2 pr-2"></textarea>
                    </div>

                    {/* Company Logo */}
                    <div className="mt-3">
                        <div className=""><small>Upload your Company Logo</small>
                        <sup className="text-primary"> *</sup></div>
                        <input type="file" name="files" onChange={this.onFileSelect} multiple/>
                      <button  onClick={this.onSubmitForm} className="btn btn-primary w-25 ml-5 text-center btn-btn-lg btn-rounded btn-save">Save</button>
                    </div>


                {/* Easy apply or noyt */}
               <div className="row mt-4">
                    <div className="col-sm-3 col-md-6 col-lg-12 ">
                    <h6>How would you like to receive your applicants?<sup className="text-primary"> *</sup></h6>
                      <div className="mt-3">
                        <input type="radio" name="typeofapply"  value="easyapply" onClick={this.handleEvent}></input>
                       <strong className="ml-2">Recommended:</strong> Let candidates apply with their LinkedIn profile and notify me by email
                       <input type="text" onClick={this.handleRadio} value="a@a.com" className="w-75 h-100 mt-2 p-3"></input> <br></br>

                       <input type="radio" onClick={this.handleEvent} name="typeofapply" value="apply" className="mt-4"/>Direct applicants to an external site to apply
                       <div><input type="text" onChange={this.handleRadio} name="companyurl" className="mt-2 w-75 p-3"></input></div>
                    </div>
                   </div>
                </div>
                <div className="mt-3 ml-3"><sup className="text-primary">*</sup>  indicates required</div>
                <button className="btn btn-primary btn-lg float-right mt-4 mb-4" onClick={this.submitJobPost}>Submit </button>
                    
            </div>

            <div class="col-sm-3 col-md-6 col-lg-4 mt-5 border ml-5" >
                    <div className="container-fluid">
                    <h6 className="mt-5">Show your job to the right candidates</h6>
                    <div>Include more details such as relevant job functions, industries, and seniority level to help us advertise your job post to qualified candidates and recommend matches for you to reach out to.</div>
                    </div>
            </div>

            </div>
        </div> );
    }
}
 
const mapStateToProps = state =>{
    return {
        authFlag : state.authFlag,
        newproperty:state.newproperty
    };
}

const mapDispatchStateToProps = dispatch => {
    return {
        submitJobPost : (data) => {
            axios.post(IP_backEnd+'/postJob', data)
                .then((response) => {
                    console.log("After post job request")
                    dispatch({type: 'JOB_POST',payload : response.data,statusCode : response.status})
            });
        },
        
    }
}

 
export default connect(mapStateToProps,mapDispatchStateToProps)(RecruiterPostJob); 