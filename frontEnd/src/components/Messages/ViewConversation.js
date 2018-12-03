import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import {IP_backEnd} from '../../config/config';
//Redux
import {connect} from 'react-redux';

class ViewConversation extends Component {

    constructor(props){
        super(props);
        this.state = {
            Message : [],
            Reply : '',
        }
    }

    componentDidMount(){
        axios.get(IP_backEnd+"/messages/user?participant1="+this.props.messagesState.participant+"&&participant2=Kevin")
            .then(response => {
                console.log(response.data);
                this.setState({
                    Message : this.state.Message.concat(response.data.messages),
                })
            })
    }

    replyChangeHandler = (e) => {
        this.setState({
            Reply : e.target.value
        })
    }

    sendMessage = (e) => {
        console.log(this.state.Reply);
        let data={
            participants : ["Suhas", "Kevin"],
            messages : {
                from : "Suhas",
                msg : this.state.Reply,
            }
        }
        axios.post(IP_backEnd+"/messages", data)
            .then(response => {
                alert("Message sent successfully");
            })
            .catch(error => {
                alert("Error sending message");
                console.log(error);
            })
    }

  render() {
    let renderMessages = this.state.Message.map(message => {
        return (
        <tr>
            <td>{message.from}</td>
            <td>{message.msg}</td>
        </tr>
        )
    })

    return (
      <div>
        <Navbar/>
        <div class="container">
            <h3>{this.props.messagesState.participant}</h3>
            <table class="table">
                <thead>
                    <th>From</th>
                    <th>Message</th>
                </thead>
                <tbody>
                    {renderMessages}
                </tbody>
            </table>
            <div class="form-inline">
                <input class="form-control" type="text" onChange={this.replyChangeHandler} placeholder="Reply to Suhas"/>
                <button class="btn btn-primary" onClick={this.sendMessage}>Reply</button>
            </div> <br/><hr/>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = ({messagesState}) => ({
    messagesState,
})

export default connect(mapStateToProps)(ViewConversation);
