import React, { Component } from 'react';
import axios from 'axios';
import { IP_backEnd } from '../../config/config';
import { Chart, Pie, Line, Bar } from 'react-chartjs-2';


class CityWiseApplications extends Component {

    constructor(props){
        super(props);
        this.state = {
            Data : {}
        }
    }

    componentDidMount(){
        axios.get(IP_backEnd+'/dashboard/city?jobID=123')
            .then(response => {
                // let resData = response.data;
                // var datasetArray = [];
                // var dataset = resData.map(data => {
                    
                // })
                this.setState({
                    Data : response.data
                })
            })
    }

  render() {
        // var 
        // let renderDataSet = this.state.Data.map(dataset => {
        //     dataset.
        // })

      var data = {
          labels: ["October", "November", "December"],
          
      };

    return (
      <div>
        <Bar data={data}/>
      </div>
    )
  }
}

export default CityWiseApplications;