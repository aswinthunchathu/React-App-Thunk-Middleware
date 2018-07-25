import React, { Component } from 'react';
import './index.css';
import logo from '../../Assets/logo.svg';

export default class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <div className="container">
           <img className="site-logo" src={logo} alt="Logo"/>
        </div>
      </header>
    );
  }
}


