import 'react-vis/dist/style.css';
import React from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';

const WeightChart = (props) => {
      const data = [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 0}
      ];
      return (
        <XYPlot width={300} height={300}>
        <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
        <VerticalGridLines style={{stroke: '#B7E9ED'}} />
        <XAxis
          title="X Axis"
          style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
          }}
        />
        <YAxis title="Y Axis" />
        <LineSeries
          className="first-series"
          data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}]}
          curve={'curveMonotoneX'}
          style={{
            strokeLinejoin: 'round',
            strokeWidth: 4
          }}
        />
        </XYPlot>
      );
    
  }
  
  export default WeightChart;