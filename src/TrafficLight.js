import React, { Component } from "react";

import "./TrafficLight.css";

const RED_LIGHT_TIME = 3;
const YELLOW_LIGHT_TIME = 1;
const GREEN_LIGHT_TIME = 3;
const CLASSES = ["lights", "lights", "lights"];

class TrafficLight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 0,
      classes: CLASSES
    };
  }

  componentWillReceiveProps = nextProps => {
    const { isTriggered } = nextProps;
    if (isTriggered) {
      this.lighting();
    } else {
      clearInterval(this.looping);
      this.setState({
        countDown: 0,
        classes: CLASSES
      });
    }
  };

  lighting = () => {
    let i;
    const timingArray = [RED_LIGHT_TIME, YELLOW_LIGHT_TIME, GREEN_LIGHT_TIME];
    const classesArray = [
      ["lights red", "lights", "lights"],
      ["lights", "lights yellow", "lights"],
      ["lights", "lights", "lights green"]
    ];

    this.props.startLight ? (i = 0) : (i = 2);

    this.setState({
      countDown: timingArray[i],
      classes: classesArray[i]
    });

    this.looping = setInterval(() => {
      if (this.state.countDown > 0) {
        this.setState({
          countDown: this.state.countDown - 1
        });
      } else {
        if (this.props.startLight) {
          if (i < 2) {
            i += 1;
            this.setState({
              countDown: timingArray[i],
              classes: classesArray[i]
            });
          } else {
            i = -1;
          }
        } else {
          if (i > 0) {
            i -= 1;
            this.setState({
              countDown: timingArray[i],
              classes: classesArray[i]
            });
          } else {
            i = 3;
          }
        }
      }
    }, 1000);
  };

  render() {
    const drawLights = () => {
      let lightsArray = [];
      for (let i = 0; i < this.state.classes.length; i++) {
        lightsArray.push(
          <div key={`light${i}`} className={this.state.classes[i]} />
        );
      }
      return lightsArray;
    };
    return (
      <div className="trafficLights" id={`trafficLight${this.props.lightId}`}>
        <span className="title">Light {this.props.lightId}</span>
        <div className="lightContainer">{drawLights()}</div>
        <div className="countdownPanel">{this.state.countDown}</div>
      </div>
    );
  }
}

export default TrafficLight;
