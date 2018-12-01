
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

}

handleClick(e){
    
}

handleLogin = (e) => {

}

renderRedirect = () => {

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
           

        <div className="ma">  
            <img style={{width : "70%"}} class="img-fluid  im" src={require('../images/NoJobsPosted.png')} /> 
            <img class="img-fluid  im" src={require('../images/Rec_Home_Footer.png')} /> 
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
