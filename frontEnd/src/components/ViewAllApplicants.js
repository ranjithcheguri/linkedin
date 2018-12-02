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
    axios.get(IP_backEnd+'/jobApplication?jobId='+this.props.applicationState.jobID)
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
          <div className="mt-3 ml-4 mr-4 border rounded shadow">
          <h4 className="ml-2 pl-2 pt-2">Name : {application.fName + " " + application.lName}</h4>
            <p className="ml-2 pl-2">Email ID : {application.email}</p>
            <p className="ml-2 pl-2">Address : {application.address}</p>
            <p className="ml-2 pl-2 pb-1"><a href="http://localhost:3002/PP-18.pdf">Resume</a></p>
          </div>
        </tr>
        
      )
    })

    return (
      <div>
        <Navbar/>
        <div class="container">
        <h3>Applications</h3>
        <div class="applications-table">
          <table class="table w-100">
            <tbody> 
              {renderApplications}
            </tbody>
          </table>
        </div>
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
