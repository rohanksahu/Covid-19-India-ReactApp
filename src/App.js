import React,{Component} from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Grid,Paper,AppBar, Typography, Card } from '@material-ui/core';
import {Pie, Doughnut} from 'react-chartjs-2';




class App extends Component {

 constructor(props) {
   super (props);
   this.state={
     TotalCase:{},
     Cases:[]
   }
 }

componentDidMount() {
  axios.get("https://api.covid19india.org/data.json")
  .then(res=>{
    this.setState(this.state.Cases=res.data.statewise.slice(1).map(val=>{
        return{
          state:val.state,
          confirmed:val.confirmed,
          active:val.active,
          recovered:val.recovered,
          deaths:val.deaths
        }
    }))

    this.setState(this.state.TotalCase=res.data.statewise[0])
    console.log(this.state.Cases)
    console.log(this.state.TotalCase)
 })}


 render(){ 
  //  defining column for datatable and map it to the field of array data
  const columns = [
    { label: "State", name: "state" },
    { label: "Total Cases", name: "confirmed" }, 
    { label: "Active Cases", name: "active" }, 
    { label: "Recovered", name: "recovered" }, 
    { label: "Deaths", name: "deaths" }
  ];
  const data=this.state.Cases;
  const options = {
  filterType: "dropdown",
  selectableRows:"none", 
  responsive: "scroll",
  sort:false
  }; 
  
  // Graph Data
//  statewise Data
let dynamicColors = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}
let colors=[]
for(let i=0;i<this.state.Cases.length;i++){
  let val=dynamicColors()
  colors.push(val)
}
  const StateData={
    labels:this.state.Cases.map(val=>val.state),
    datasets: [
      {
        backgroundColor:colors,
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: this.state.Cases.map(val=>val.confirmed)
      }
    ]
  }
 
  const TotalData=this.state.TotalCase;
  // india covid stats data
  const IndiaData={
    labels:["India Total Cases","India Total Active Cases","India Total Recovered","India Total Deaths"],
    datasets: [
      {
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: [TotalData.confirmed,TotalData.active,TotalData.recovered,TotalData.deaths]
      }
    ]
  }

  return(
    <div>
      <AppBar color="primary" position="sticky"> 
        <Typography align="center">Coivd-19 India</Typography>
      </AppBar>
     <Grid container spacing={2}>
       <Grid item md={6} sm={12} justify="space-evenly">
         <Card>
          <Pie
          data={IndiaData}
          options={{
            title:{
              display:true,
              text:'India Covid-19 Stats',
              fontSize:20
            },
            legend:{
              display:false,
            }
          }}
        />
        </Card>
       </Grid>
       <Grid item md={6} sm={12}>
         <Card>
          <Doughnut
          data={StateData}
          options={{
            title:{
              display:true,
              text:'statewise confirmed case',
              fontSize:20
            },
            legend:{
              display:false,
            }
          }}
        />
        </Card>
       </Grid>
        
      <Grid item md={12} sm={12} align="space-around">
       <MUIDataTable
        data={data}
        columns={columns}
        options={options}
       />
       </Grid>
     </Grid>
     <AppBar color="primary" position="relative"> 
        <Typography align="center">Build By Rohan Kumar Sahu</Typography>
      </AppBar>
    </div>
  )
}
}

export default App;
