import React, { Component } from "react";

import "./TrafficSignal.css";
import Lamp from "./Lamp";

var TRIGGERS_ARRAY = [];
var lampChange = 0;

class TrafficSignal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 0,
      triggerArray: Array(this.props.totalLamps).fill(false)
    };
  }

  componentWillReceiveProps = nextProps => {
    const { isTriggered } = nextProps;
    if (isTriggered) {
      this.lighting();
    } else {
      clearInterval(this.lightLooping);
      TRIGGERS_ARRAY = [];
      this.setState({
        countDown: 0,
        triggerArray: Array(this.props.totalLamps).fill(false)
      });
      lampChange = 0;
    }
  };

  lighting = () => {
    let indexArr = [];

    this.props.order.forEach((element, index) => {
      indexArr.push(this.props.order.indexOf(index + 1));
    });

    indexArr.forEach(element => {
      let arr = Array(this.props.totalLamps).fill(false);
      arr.fill(true, element, element + 1);
      TRIGGERS_ARRAY.push(arr);
    });

    if (lampChange < this.props.totalLamps) {
      this.setState({
        triggerArray: TRIGGERS_ARRAY[lampChange]
      });
    }
  };

  handleLampChange = () => {
    if (this.props.isTriggered) {
      lampChange += 1;
      if (lampChange < this.props.totalLamps) {
        this.setState({
          triggerArray: TRIGGERS_ARRAY[lampChange]
        });
      } else {
        lampChange = 0;
        this.setState({
          triggerArray: TRIGGERS_ARRAY[lampChange]
        });
      }
    }
  };

  handleCountDown = countDown => {
    if (this.props.isTriggered) {
      this.setState({ countDown }, () => {
        console.log("countdown => ", this.state.countDown);
        return null;
      });
    }
    return null;
  };

  render() {
    const drawLights = () => {
      let lightsArray = [];
      for (let i = 0; i < this.props.totalLamps; i++) {
        lightsArray.push(
          <Lamp
            key={`light${i}`}
            element={`lamp${i + 1}`}
            glow={this.props.glows[i]}
            timer={this.props.timing[i]}
            isTriggered={this.state.triggerArray[i]}
            onChangeCountDown={this.handleCountDown}
            onLampChange={this.handleLampChange}
          />
        );
      }
      return lightsArray;
    };

    return (
      <div
        className="trafficLights"
        id={`trafficLight${this.props.trafficSignalId}`}
      >
        <span className="title">Light {this.props.trafficSignalId}</span>
        <div className="lightContainer">{drawLights()}</div>
        <div className="countdownPanel">{this.state.countDown}</div>
      </div>
    );
  }
}

export default TrafficSignal;
