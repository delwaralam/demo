import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddressInput extends Component {
  static propTypes = {
    buttonClick: PropTypes.func,
    error: PropTypes.string,
    updateAddress: PropTypes.func,
  }
  render() {
    return (
      <div>
        {
          this.props.error !== '' ? <div className="card xs-mb2 xs-p1 fill-red text-white xs-overflow-auto"> 
            {this.props.error}
          </div> : null
        }
        
        <label className="form-label">
          Please enter the NEO public address you would to login with:
        </label>

        <input 
          type="text" 
          className="text-input xs-mb1" 
          placeholder="ASs7BiaRa9Z2NnJfvf7a4S..."
          onChange={this.props.updateAddress}
        ></input>

        <button className="button" onClick={this.props.buttonClick}>Login</button>
      </div>
    );
  }
}

export default AddressInput;
