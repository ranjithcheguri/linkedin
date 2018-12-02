import React, { Component } from 'react';
import LogSaveJob from './logSavedJob';
import {Chart,Pie,Line,Bar} from 'react-chartjs-2'
import axios from "axios";
import {Link} from 'react-router-dom';
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          Data:"",
           
            
              // planetData :{
              //   labels: ['Boston', 'Worcester', 'San Jose', 'New York', 'Seattle', 'Fremont'],
              //   datasets: [   {
                    
              //     label:'Half filled application',
              //     data:[
              //       124,
              //       145,
              //       130,
              //       106,
              //       116,
              //       57
              //     ],
              //     backgroundColor: 'rgba(99, 132, 0, 0.6)',
              //     width:'20cm'
              //   }, {
              //     label:'Full filled',
                  
              //     data:[
              //       70,
              //       120,
              //       153,
              //       106,
              //       105,
              //       50
              //     ],
              //     backgroundColor:
              //     'rgba(75, 192, 192, 0.6)',
                   
              //   }, {
              //     label:'Read',                 
              //     data:[
              //       75,
              //       185,
              //       153,
              //       65,
              //       101,
              //       95
              //     ],
              //     backgroundColor:
              //       'rgba(255, 99, 132, 0.6)'
              //       }]
              // }
         }
    }
    componentDidMount() {
      console.log("I am here")
      const data={
          job_id:100,
          search:true
      }
      axios.put(IP_backEnd+'/recruiter/logData',data)
        .then(res => {
            console.log("response for dashboard")
            console.log(res)
          const info = res.data;
          console.log(res.data)
          let city = [];
          let half_filled = [];
          let full_filled = [];
          let clicks = [];
          info.forEach(element => {
            city.push(element.city);
            half_filled.push(element.half_filled);
            full_filled.push(element.full_filled);
            clicks.push(element.clicks);
          });
          console.log("title"+city)
          console.log(half_filled)
          console.log(full_filled)
          console.log(clicks)
          this.setState({ 
            Data: {
              labels: city,
              datasets:[
                 {
                    label:'Half Filled ',
                    data: half_filled,
                    backgroundColor: 'rgba(255,105,145,0.6)',
                 },
                 {
                  label:'Full Filled',
                  data: full_filled,
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                 }, {
                  label:'Read',                 
                  data:clicks,
                  backgroundColor:
                    'rgba(255, 99, 132, 0.6)'
                    }

              ]
           }
           });
        })
    }
    render() { 
        return ( <div className="w-50 h-50">
        <div>
        <h6 className="mt-5 text-center">
        <ul>Graph for posted job: Software Engineer Intern</ul></h6>
        {/* <LogSaveJob /> */}
        <div className="w-50 h-50">
            <Bar
            	data={this.state.Data}
              // width={100}
              // height={50}
              options={{
                maintainAspectRatio: false
              }}
          />
          </div>
          <div>
          <h6 className="mt-5 text-center">
          <ul>Graph for all jobs posted by you: No of applicants saved the job</ul></h6>
          <LogSaveJob />
          </div>
          </div>
        </div>);
    }
}
 
export default Dashboard;


// https://appdividend.com/2018/03/26/how-to-create-charts-in-react-js/
// https://www.youtube.com/watch?v=Ly-9VTXJlnA
// https://github.com/bradtraversy/reactcharts/blob/master/src/App.js