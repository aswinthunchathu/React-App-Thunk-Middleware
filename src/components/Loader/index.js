import React, { Component } from 'react';
import './index.css';
import gif from "./loader.gif";

const Loader = (obj) => (WrappedComponent) => {
  return class Loader extends Component {
    render() {
      return (
        this.props[obj] ?
          (<div className="section-loading position-relative">
            <div className="loader position-absolute w-100 h-100">
              <img src={gif} alt="Loading..." className="loading-gif position-absolute" />
            </div>
            <WrappedComponent {...this.props} />
          </div>) :
          <WrappedComponent {...this.props} />
      )
    }
  }
}

export default Loader;

