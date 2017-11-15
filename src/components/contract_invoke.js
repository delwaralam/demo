import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Countdown from './countdown';

const BlockAuth = require('blockauth-client');

class ContractInvoke extends Component {
  static propTypes = {
    contract: PropTypes.object,
    hasExpired: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      transactionHash: ''
    };
  }
  componentDidMount() {
    const self = this;
    const interval = setInterval(function() {
      BlockAuth.checkInvoke('http://server.demo.6854c841.svc.dockerapp.io', self.props.contract.token, (data, error) => {
        if (error) {
          return;
        }
  
        self.setState({
          transactionHash: data.transactionHash
        });
        clearInterval(self.state.interval);
      });
    }, 10000)

    this.setState({
      interval: interval,
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render() {
    if (this.state.transactionHash !== '') {
      return (
        <div>
          <p>Success! <span role="img" aria-label="party-emoji">🎉</span></p>
          
          <p className="xs-mt1">
            Thank you for using the BlockAuth Demo. Your login was tracked to the following transaction:
          </p>
          <div className="card xs-mt1 xs-p1 fill-gray-lighter xs-overflow-auto"> 
            {this.state.transactionHash}
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>Invoke the following contract address with the parameters listed below:</p>
        <div className="card xs-mt1 xs-mb3 xs-p1 fill-gray-lighter xs-overflow-auto"> 
          {this.props.contract.address}
        </div>

        <p>First parameter:</p>
        <div className="card xs-my1 xs-p1 fill-gray-lighter xs-overflow-auto"> 
          {this.props.contract.parameters[0]}
        </div>

        <p>Second parameter:</p>
        <div className="card xs-mt1 xs-mb3 xs-p1 fill-gray-lighter xs-overflow-auto"> 
          {this.props.contract.parameters[1]}
        </div>

        <Countdown expiresAt={this.props.contract.expiresAt} hasExpired={this.props.hasExpired} />
      </div>
    );
  }
}

export default ContractInvoke;
