import React, { Component } from 'react';
import './index.css';

export default class BackButton extends Component {
  // replace with PropTypes.object if you use them
  static contextTypes = {
    router: () => null, 
  }
  render() {
    return (
      <button title="Go Back" className={this.props.className} onClick={this.context.router.history.goBack}>{this.props.children? this.props.children : 'Back'}</button>
    );
  }
}


