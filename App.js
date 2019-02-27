import { Svg } from 'expo';
const { Circle, Rect, Line, Text } = Svg;
var json = require("./data3.json");
var jsonData=json["data"];
// var minX=10000;
// var maxX=0;
// var minY=jsonData.length;
// var minX=1;

import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={minY:10000, maxY:0, minX:1, maxX:jsonData.length};
    
 }
  
  setMinXMaxX(){
    jsonData.forEach(element => {
      if (this.state.maxY<element['pulses']){
        this.state.maxY=element['pulses'];
      }
      if(this.state.minY>element['minimum']){
        this.state.minY=element['minimum'];
      }
    });
  }

  render(){
    this.setMinXMaxX();
    var chart = [];
    var chartMin =[];
    for (var i=0; i<jsonData.length-1; i++){
      var pulse1 = jsonData[i]['pulses'];
      var pulse2 = jsonData[i+1]['pulses'];
      var min1 = jsonData[i]['minimum'];
      var min2 = jsonData[i+1]['minimum'];
      chart.push(
        <Line
          key={i}
          x1={this.getSvgY(pulse1).toString()+"%"}
          x2={this.getSvgY(pulse2).toString()+"%"}
          y1={i+6+"%"}
          y2={i+7+"%"}
          stroke="red"
          strokeWidth="2"/>
      );
      chartMin.push(<Line
        key={-i}
        x1={this.getSvgY(min1).toString()+"%"}
        x2={this.getSvgY(min2).toString()+"%"}
        y1={i+6+"%"}
        y2={i+7+"%"}
        stroke="green"
        strokeWidth="2"/>);
    }

    // console.log(this.state.minY);
    // console.log(this.state.maxY);
    return(
        <View>
      <Svg height="100%" width="100%" viewBox="0 0 400 800">
        <Line
          x1="6%"
          y1="6%"
          x2="100%"
          y2="6%"
          stroke="black"
          strokeWidth="1"/>
          <Line
          x1="6%"
          y1="6%"
          x2="6%"
          y2="100%"
          stroke="black"
          strokeWidth="1"/>
          <Line
          x1="53%"
          y1="5%"
          x2="53%"
          y2="7%"
          stroke="black"
          strokewidth="1"/>
          {/* <Text
            rotation="90"
            stroke="black"
            fontSize="10"
            x="0"
            y="100">{this.state.maxY/2}</Text>
          <Text
            rotation="90"
            stroke="black"
            fontSize="10"
            x="98%"
            y="2%">{this.state.maxY}</Text>
          <Text
            stroke="black"
            fontSize="10"
            x="2%"
            y="5%">{jsonData[0]["day"]}</Text>
         <Text
            stroke="black"
            fontSize="10"
            x="20"
            y="500">{jsonData[Math.floor(jsonData.length/2)]["day"]}</Text> */}

          <Line
            x1="5%"
            y1="53%"
            x2="7%"
            y2="53%"
            stroke="black"
            strokewidth="1"/>
          
          {/* <Text
            stroke="black"
            fontSize="10"
            x="4%"
            y="98%">{jsonData[jsonData.length-1]["day"]}</Text> */}
          

          {chart}
          {chartMin}
      </Svg>
    </View>
    );
  }

  getSvgY(y){
    return (y/this.state.maxY*94)+6;
  }

}
