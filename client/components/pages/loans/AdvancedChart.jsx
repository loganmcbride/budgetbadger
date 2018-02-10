import React, { Component } from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
var ctx = 'myChart';

class AdvancedChart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      items: []
    }
    this.myChart = this.myChart.bind(this);
  }

  myChart(){
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [...this.props.chartDates],
          datasets: [{
              label: 'Amount Outstanding',
              data: [...this.props.chartPrincipal],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
              ],
              borderWidth: 1
          }, {
            label: 'Total Paid',
              data: [...this.props.chartOutstanding],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      min: 0,
                      max: this.props.principal,
                      beginAtZero:true,
                  }
              }]
          }
      }
    })
  }; 
  
  // console.log('this is motherfucking props', props)
  componentDidMount(){
    this.myChart();
  }

  shouldComponentUpdate({ name }){
    if(name !== this.props.name){
      this.myChart();
    }
  }

  render(){
    return(
      <div>
        <canvas id="myChart" width={1200} height={500}></canvas>
      </div>
    )
  }
}

module.exports = AdvancedChart;