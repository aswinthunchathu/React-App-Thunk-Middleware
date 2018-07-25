import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';

class SelectBox extends Component {

  static propTypes = {
    // Injected by React Redux
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    className: PropTypes.string,
    label : PropTypes.string
  }

  generateOptions(options) {
    return options.map((item, index) => (
        <option key={index} value={item}>{item}</option>
    ));
  }

  render() {
    const { value, onChange, options, className, label } = this.props;
    return (
      <div className={className}>
        {label ? <label>{label}</label> : null}
        <select className="form-control"
          value={value}
          onChange={onChange}>
          {this.generateOptions(options)}
        </select>
      </div>
    );
  }
}

export default SelectBox;
