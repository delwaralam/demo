import React, { Component } from 'react';
import PropTypes from 'prop-types';

const moment = window.moment;

class Countdown extends Component {
  static propTypes = {
    expiresAt: PropTypes.number,
    hasExpired: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      formatted: null,
      interval: null
    };
    this.prettify = this.prettify.bind(this);
    this.timeRemaining = this.timeRemaining.bind(this);
  }
  prettify() {
    const diff = this.timeRemaining()
    let formatted = '';
    
    if (diff > 60) {
      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60
      formatted = minutes + ' minutes ' + seconds + ' seconds' 
    } else {
      formatted = diff + ' seconds'
    }

    return formatted
  }
  timeRemaining() {
    const expires = moment.unix(this.props.expiresAt);
    const now = moment();
    const diff = expires.diff(now, 'seconds');

    if (diff < 0) {
      this.props.hasExpired();
    } else {
      return diff;
    }
  }
  componentDidMount() {
    const self = this;
    const interval = setInterval(function() {
      self.setState({
        formatted: self.prettify()
      });
    }, 1000)

    this.setState({
      formatted: this.prettify(),
      interval: interval,
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render() {
    return <p>You have {this.state.formatted} left to invoke the contract and login.</p>
  }
}

export default Countdown;
