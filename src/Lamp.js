import React, { Component } from "react";

import "./Lamp.css";

class Lamp extends Component {
  componentWillReceiveProps = nextProps => {
    const { isTriggered } = nextProps;
    if (isTriggered) {
      this.counting();
    } else {
      clearInterval(this.timer);
      this.setState({ countDown: 0 });
    }
  };

  counting = () => {
    let countDown = this.props.timer;
    this.timer = setInterval(() => {
      if (countDown > 0) {
        console.log("countdown", countDown, "of", this.props.element);
        this.props.onChangeCountDown(countDown);
        countDown -= 1;
      } else {
        clearInterval(this.timer);
        this.props.onLampChange();
      }
    }, 1000);
  };

  render() {
    // console.log(this.props.element, this.props.isTriggered);
    return (
      <div
        className="lights"
        style={{
          backgroundColor: `${this.props.isTriggered ? this.props.glow : ""}`
        }}
      />
    );
  }
}

export default Lamp;
