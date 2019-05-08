import React, { Component } from "react";

import "./App.css";
import TrafficSignal from "./TrafficSignal";

const TRAFFIC_SIGNALS = 1; // number of traffic signals
const LAMPS_COUNT_ARRAY = [3]; // lamps count in each traffic signals
const COLORS_ARRAY = ["red", "yellow", "green"]; // color for each lamps
const GLOW_ORDERS_ARRAY = [[3, 2, 1]]; // glowing order for each lamps
const TIMINGS_ARRAY = [[4, 2, 3]]; // timing for each lamps to glow

// You can play with Traffic Signals only if all the below mentioned conditions are satisfied.

// TRAFFIC_SIGNALS === LAMPS_COUNT_ARRAY.length === GLOW_ORDERS_ARRAY.length === TIMINGS_ARRAY.length
// Math.max(...LAMPS_COUNT_ARRAY) === COLORS_ARRAY.length
// LAMPS_COUNT_ARRAY[i] === GLOW_ORDERS_ARRAY[i].length === TIMINGS_ARRAY[i].length

class App extends Component {
  state = {
    trigger: false,
    btnText: "LIGHT ON"
  };

  render() {
    const trafficLightCreation = () => {
      let signals = [];
      let count = 0;
      if (
        TRAFFIC_SIGNALS === LAMPS_COUNT_ARRAY.length &&
        TRAFFIC_SIGNALS === GLOW_ORDERS_ARRAY.length &&
        TRAFFIC_SIGNALS === TIMINGS_ARRAY.length &&
        Math.max(...LAMPS_COUNT_ARRAY) === COLORS_ARRAY.length
      ) {
        for (let i = 0; i < TRAFFIC_SIGNALS; i++) {
          if (
            LAMPS_COUNT_ARRAY[i] === GLOW_ORDERS_ARRAY[i].length &&
            LAMPS_COUNT_ARRAY[i] === TIMINGS_ARRAY[i].length
          )
            count += 1;
        }
        if (count === TRAFFIC_SIGNALS) {
          signals.push(
            <button
              key={0}
              className="startBtn"
              onClick={() => handleBtnClick()}
              style={{
                backgroundColor:
                  this.state.btnText === "LIGHT ON" ? "#34a9cc" : "#f03535"
              }}
            >
              {this.state.btnText}
            </button>
          );
          for (let i = 1; i <= TRAFFIC_SIGNALS; i++) {
            let glows = COLORS_ARRAY.slice(0, LAMPS_COUNT_ARRAY[i - 1]);
            signals.push(
              <TrafficSignal
                key={i}
                glows={glows}
                trafficSignalId={i}
                timing={TIMINGS_ARRAY[i - 1]}
                order={GLOW_ORDERS_ARRAY[i - 1]}
                isTriggered={this.state.trigger}
                totalLamps={LAMPS_COUNT_ARRAY[i - 1]}
              />
            );
          }
        } else {
          signals.push(errorBlock());
        }
      } else {
        signals.push(errorBlock());
      }

      return signals;
    };

    const errorBlock = () => {
      return (
        <div key="error" className="errorBlock">
          CHECK THE INITIAL VALUES
        </div>
      );
    };

    const handleBtnClick = () => {
      this.setState({
        trigger: !this.state.trigger,
        btnText: this.state.btnText === "LIGHT ON" ? "LIGHT OFF" : "LIGHT ON"
      });
    };

    return <div id="app">{trafficLightCreation()}</div>;
  }
}

export default App;
