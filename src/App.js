import React, { Component } from "react";

import "./App.css";
import TrafficLight from "./TrafficLight";

const LIGHT_COUNT = 4;

class App extends Component {
  state = {
    trigger: false,
    btnText: "LIGHT ON"
  };

  render() {
    const trafficLightCreation = () => {
      var lights = [];
      for (let i = 1; i <= LIGHT_COUNT; i++) {
        lights.push(
          <TrafficLight
            key={i}
            lightId={i}
            startLight={i % 2}
            isTriggered={this.state.trigger}
          />
        );
      }
      return lights;
    };

    const handleBtnClick = () => {
      this.setState({
        trigger: !this.state.trigger,
        btnText: this.state.btnText === "LIGHT ON" ? "LIGHT OFF" : "LIGHT ON"
      });
    };

    return (
      <div id="app">
        <button
          className="startBtn"
          onClick={() => handleBtnClick()}
          style={{
            backgroundColor:
              this.state.btnText === "LIGHT ON" ? "#34a9cc" : "#f03535"
          }}
        >
          {this.state.btnText}
        </button>
        {trafficLightCreation()}
      </div>
    );
  }
}

export default App;
