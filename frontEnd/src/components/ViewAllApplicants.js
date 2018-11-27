import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import {IP_backEnd} from '../config/config';
import '../css/viewAllApplicants.css';
//Redux
import {connect} from 'react-redux';

class ViewAllApplicants extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      Applications : [],
    }
  }

  componentDidMount(){
    axios.get(IP_backEnd+'/jobApplication?jobId=123')//+this.props.applicationState.jobID)
      .then(response => {
        this.setState({
          Applications : this.state.Applications.concat(response.data),
        })
      })
  }

  render() {

    let renderApplications = this.state.Applications.map(application => {
      return(
        <tr>
          <h4>Name : {application.fName + " " + application.lName}</h4>
          <p>Email ID : {application.email}</p>
          <p>Address : {application.address}</p>
        </tr>
      )
    })

    return (
      <div>
        <Navbar/>
        <div class="container">
        <h3>Applications</h3>
          <table class="table">
            <tbody>
              {renderApplications}
            </tbody>
          </table>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = ({applicationState}) => ({
  applicationState,
})

export default connect(mapStateToProps)(ViewAllApplicants);
