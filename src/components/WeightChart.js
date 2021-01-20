import 'react-vis/dist/style.css';
import React from 'react'
import {timeFormat} from 'd3-time-format';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, FlexibleWidthXYPlot} from 'react-vis';


    const WeightChart = (props) => {
        const data = props.weight.map((weight) => { 
          const formatDate = timeFormat("%m/%d/%Y")
          const date = new Date(weight.created_at)
          const formattedDate = formatDate(date)
          return {x: formattedDate, y: weight.weight}
      })


      return (
        <FlexibleWidthXYPlot xType="ordinal" height={300}>
        <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
        <VerticalGridLines style={{stroke: '#B7E9ED'}} />
        <XAxis
          title="Date"
          style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
          }}
        />
        <YAxis title="Weight" />
        <LineSeries
          data={data}
          curve={'curveMonotoneX'}
          style={{
            strokeLinejoin: 'round',
            strokeWidth: 3
          }}
        />
        </FlexibleWidthXYPlot>
      );
    
  }
  
  export default WeightChart;