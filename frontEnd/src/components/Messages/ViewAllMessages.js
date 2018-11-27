import React, { Component } from 'react';
import axios from 'axios';
import {IP_backEnd} from '../../config/config';
import Navbar from '../Navbar';
import Footer from '../Footer';
import {setCurrentConversation} from '../../actions/messageActions';
//Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ViewAllMessages extends Component {

  constructor(props){
    super(props);
    this.state = {
      Messages : [],
    }
  }

  componentDidMount(){
    axios.get(IP_backEnd+'/messages?participantID=Kevin')
      .then(response => {
        this.setState({
          Messages : this.state.Messages.concat(response.data),
        })
      })
  }

  viewConversation = (e, participant) => {
    e.preventDefault();
    this.props.setCurrentConversation(participant);
    this.props.history.push('/conversation');
  }

  render() {

    let renderMessages = this.state.Messages.slice(0).reverse().map((message, index) => {
      if (!message || this.state.Messages.length == 0) {
        return (<tr>No messages found</tr>)
      } else {
        return (
          <tr onClick={(e)=>this.viewConversation(e,message.messages[0].from)}>
            <td>{message.messages[0].from}</td>
            <td>{message.messages[0].msg}</td>
            <td>
              {(message.messages[0].status == 'NR')? "Unread" : "Read"}
            </td>
          </tr>
        )
      }
    })

    return (
      <div>
        <Navbar/>
        <div class="container">
          <br />
          <h1>Inbox</h1>
          <table class="table">
            <thead>
              <tr>
                <th>From</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {renderMessages}
            </tbody>
          </table>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = ({messagesState}) => ({
  messagesState,
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setCurrentConversation,
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewAllMessages);