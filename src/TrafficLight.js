import React, { Component } from "react";

import "./TrafficLight.css";

const TOTAL_LAMPS = 7; // number of lamps
const TIMING_ARRAY = [4, 3, 2, 1, 2, 3, 4]; // timing for each lamps - unit of time is seconds
const COLORS_ARRAY = [
  "red",
  "yellow",
  "green",
  "blue",
  "orange",
  "magenta",
  "indigo"
]; // color for each lamps

const CLASSES = Array(TOTAL_LAMPS).fill("");
const CLASSES_ARRAY = Array(TOTAL_LAMPS)
  .fill("")
  .map(() => new Array(TOTAL_LAMPS).fill(""));

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

    this.props.startLight ? (i = 0) : (i = TOTAL_LAMPS - 1);

    this.setState({
      countDown: TIMING_ARRAY[i],
      classes: CLASSES_ARRAY[i]
    });

    this.looping = setInterval(() => {
      if (this.state.countDown > 0) {
        this.setState({
          countDown: this.state.countDown - 1
        });
      } else {
        if (this.props.startLight) {
          if (i < TOTAL_LAMPS - 1) {
            i += 1;
            this.setState({
              countDown: TIMING_ARRAY[i],
              classes: CLASSES_ARRAY[i]
            });
          } else {
            i = -1;
          }
        } else {
          if (i > 0) {
            i -= 1;
            this.setState({
              countDown: TIMING_ARRAY[i],
              classes: CLASSES_ARRAY[i]
            });
          } else {
            i = TOTAL_LAMPS;
          }
        }
      }
    }, 1000);
  };

  render() {
    for (let i = 0; i < TOTAL_LAMPS; i++) {
      CLASSES_ARRAY[i][i] = COLORS_ARRAY[i];
    }

    const drawLights = () => {
      let lightsArray = [];
      for (let i = 0; i < TOTAL_LAMPS; i++) {
        lightsArray.push(
          <div
            key={`light${i}`}
            className="lights"
            style={{ backgroundColor: `${this.state.classes[i]}` }}
          />
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
