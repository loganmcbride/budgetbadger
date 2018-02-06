import React, { Component } from 'react';
import { Hero, Box, Heading, Image, Footer, Title, Paragraph, Anchor, Menu, Section, Headline, Legend, NumberInput, Columns, Value, CurrencyIcon, LinkUpIcon, Split, Layer, Form, Header, FormFields, EditIcon, Button, FormField, TextInput, DateTime } from 'grommet';
import Chart, { Axis, Grid, Area, Bar, Base, Layers, Line, Marker, MarkerLabel, HotSpots } from 'grommet/components/chart/Chart';
import c3 from 'c3';


class LoanChart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      advancedChart: false
    }
  }
  
  // advancedChart = c3.generate({
  //   bindto: '#chart',
  //   data: {
  //     x: 'x',
  //     columns: [
  //       [...this.props.chartOutstanding],
  //       [...this.props.chartPrincipal]
  //     ]
  //   },
  //   axis: {
  //     x: {
  //       type: 'timeseries'
  //     },
  //   },
  // })

  render(){
    return(
      <div >
      { this.state.advancedChart ? (
        <div id='chart'/>
      ) : (
        <Chart style={{fontSize: "20px"}} full={true}>
          <Axis count={5}
            labels={[{"index": 2, "label": "$" + this.props.principal/2}, {"index": 4, "label": "$" + this.props.principal}]}
            vertical={true} />
          <Chart vertical={true} full={true}>
            <Base height='small'
              width='large' />
            <Layers>
              <Grid rows={10}
                columns={3} />
              <Area values={this.props.chartOutstanding}
                colorIndex='graph-1'
                points={true}
                activeIndex={-1} 
                max={this.props.principal} />
              <Line values={this.props.chartPrincipal}
                colorIndex='accent-1'
                points={true}
                activeIndex={-1} 
                max={this.props.principal}/>
            </Layers>
            <Axis count={3}
              labels={[{"index": 0, "label": this.props.inception}, {"index": 1, "label": Math.floor(this.props.inception + this.props.term/2)}, {"index": 2, "label": this.props.inception + this.props.term}]} />
            <Legend style={{fontSize: "20px"}} series={[{"label": "Total Paid", "colorIndex": "graph-1"}, {"label": "Balance Outstanding", "colorIndex": "accent-1"}]} />
          </Chart>
        </Chart>
      )}
      </div>
    );
  }
}

module.exports = LoanChart;