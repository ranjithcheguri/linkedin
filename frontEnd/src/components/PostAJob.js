
import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Redirect} from 'react-router';
import axios from 'axios';
import { connect } from "react-redux";
import '../css/Home.css';
import { IP_backEnd, IP_NODE_PORT } from '../config/config';
import { submitLogin } from '../actions/loginActions';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import NavbarRecruiter from './NavbarRecruiter.js'

class Home extends Component {
    constructor(props) {
        super(props);
    this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        message:"success",
        flag:0
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
}

handleChange (e){
    console.log(" Signup Value getting changed");
    this.setState({
        //square brackets must
        [e.target.name]: e.target.value
    })
}

handleClick(e){
    console.log("I am here inside form submit")
    e.preventDefault();
    console.log(this.state);
    const data = this.state;
    var ackmessage;
    axios.defaults.withCredentials = true;
    if(this.state.firstName==""){
        ackmessage="Enter your first name:"
        this.setState({flag:1})
    }else if(this.state.lastName==""){
        ackmessage="Enter your last name:"
        this.setState({flag:1})
    }else if(this.state.email==""){
        ackmessage="Enter your email:"
        this.setState({flag:1})
    }else if(this.state.password==""){
        ackmessage="Enter your password:"
        this.setState({flag:1})
    }else if(this.state.password.length<6){
        ackmessage="Password must be 6 characters or more:"
        this.setState({flag:1})
    }
    else{
    axios.post(IP_backEnd + '/signup', data)
        .then(response => {
            if (response.status === 200) {
                alert("sign up successfull !");
                ackmessage="sucess"
                this.setState({flag:0})
                console.log("sign up successful, data inserted");
                // this.props.history.push('/Login');
            }
        })
        .catch((error) => {
            alert("Email already exists");
            // console.log("Response status : ", error.response.status, "Response : ", error.response.data);
        })
    }
    this.setState({message:ackmessage})
}

handleLogin = (e) => {
    e.preventDefault();
    console.log("Hello I am here")
    let { email, password } = this.state;
    const data= {
        email:email,
        password:password
    }
    console.log(data)
    if(this.state.email==""||this.state.password=="")
      alert("Fill all the information for Login");
    else{
    this.props.submitLogin(email, password)
    }
}

renderRedirect = () => {
    if (this.props.redirectVar) {
        console.log("redirecting... email is ",this.state.email)
        sessionStorage.setItem('username', this.state.email);
        return <Redirect to='/' />
    }
}

    render() { 
        console.log("On unsuccessfull login message:"+ this.props.errormessage)
        console.log("Token is:"+window.localStorage.getItem('token'))
        console.log(this.state.message)
        const{message}=this.state
        if(this.state.message!="success" && this.state.flag==1){
            console.log(this.state.message)
            var al=( <div>
                {window.scrollTo(0, 0)}
                   <div className="alert text-white alert-dismissible alertcolor">
                       <button type="button" className="close" data-dismiss="alert">&times;</button>
                       <h6> <i className="fa fa-thumbs-o-down mr-1"></i>
                      {this.state.message}</h6>
                   </div>
                  </div>
                )
        }

        //  if(this.props.response === 400 && this.props.errormessage!="") alert(this.props.errormessage)
        //  
        return ( 
        <div class="">
        <div className="ma">  
        <NavbarRecruiter/>
           <img class="img-fluid  im" src={require('../images/PostAJob.jpg')}></img> 
           <div className="container-fluid mt-3 bg-light topl col-lg-4 col-lg-offset-3 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12 border border-secondary shadow-lg rounded ">
            <div className="row-entry">
            <div class="panel-heading ml-1 mr-1 ">
                    <div >
                        <form onSubmit={this.submitEvent}>
                            <div className="mt-3">
                            <div><input type="text" id="firstName" name="firstName" className="panel-input w-100" onChange={this.handleChange} required placeholder="Company"/></div>
                            </div>
                            <div className="mt-3">
                            <input type="text" id="lastName" name="lastName" className="panel-input w-100" onChange={this.handleChange} required placeholder="Software Developer"/>
                            </div>
                            <div className="mt-3">
                            <input type="text" id="lastName" name="lastName" className="panel-input w-100" onChange={this.handleChange} required placeholder="Location"/>
                            </div>
                            <button type="submit" className="btn mt-2 mb-3 w-100 text-white btn-primary" onClick={this.handleClick}><strong>Start job post</strong></button> 
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className="ma">  
            <img class="img-fluid  im" src={require('../images/PostAJob_1.png')} /> 
            <img class="img-fluid  im" src={require('../images/PostAJob_2.png')} /> 
            <img class="img-fluid  im" src={require('../images/PostAJob_3.png')} /> 
        </div>      


        </div>
        </div> );
    }
}

const mapStateToProps = (state) => ({
    redirectVar: state.loginState.redirectVar,
    response: state.loginState.response,
    errormessage:state.loginState.errormessage
})

export default connect(mapStateToProps, { submitLogin })(Home);
