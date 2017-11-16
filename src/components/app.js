import React, { Component } from 'react';
import ga from 'react-ga';
import AddressInput from './address_input';
import ContractInvoke from './contract_invoke';

const BlockAuth = require('blockauth-client');

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      address: '',
      contract: null,
      error: ''
    };

    this.buttonClick = this.buttonClick.bind(this);
    this.hasExpired = this.hasExpired.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.updateAddress = this.updateAddress.bind(this);

    if (window.location.host !== 'localhost:3000') {
      ga.initialize('UA-109788663-1');
      ga.pageview(window.location.pathname + window.location.search);
    }
  }
  buttonClick() {
    BlockAuth.createContract('http://server.demo.6854c841.svc.dockerapp.io', this.state.address, (contract, error) => {
      if (error) {
        this.setState({
          error: 'An error occured, please try again'
        });
        return;
      }

      this.setState({
        error: '',
        contract: {
          address: contract.address,
          expiresAt: contract.expiresAt,
          parameters: contract.parameters,
          token: contract.token
        }
      });
    });

    return false;
  }
  hasExpired() {
    this.setState({
      error: 'Session has expired, please try again'
    });
  }
  updateAddress(event) {
    this.setState({
      address: event.target.value
    });
  }
  renderCard() {
    if (this.state.error !== '') {
      return <AddressInput buttonClick={this.buttonClick} error={this.state.error} updateAddress={this.updateAddress} />;
    }

    if (this.state.contract === null) {
      return <AddressInput buttonClick={this.buttonClick} error={''} updateAddress={this.updateAddress} />;
    } else {
      return <ContractInvoke contract={this.state.contract} hasExpired={this.hasExpired} />
    }
  }
  render() {
    return (
      <div className="xs-pb2">
        <div className="xs-py4 xs-text-center">
          <h1>BlockAuth Demo</h1>
        </div>

        <div className="card xs-mb2 xs-p3"> 
          {
            this.renderCard()
          }
        </div>

        <div className="xs-text-center">
          Check out <a href="https://github.com/blockauth">BlockAuth</a> on Github
        </div>
      </div>
    );
  }
}

export default App;
