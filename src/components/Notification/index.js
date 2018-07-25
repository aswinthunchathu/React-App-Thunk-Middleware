import React, { Component } from 'react';
import './index.css';
import { defaultSettings } from './defaultSettings';
import PropTypes from 'prop-types';

class Notification extends Component {

  static propTypes = {
    // Injected by React Redux
    heading: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
    type: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
  }

  componentDidMount() {
    const { show } = this.state;
    let timeout = setTimeout(() => {
      this.setState({ show: false });
    }, defaultSettings.timeout);
    if (!show) {
      clearTimeout(timeout)
    }
  }

  closeNotification() {
    this.setState({ show: false });
  }

  render() {
    const { heading, message, type } = this.props;
    const { show } = this.state;
    return (
      show ?
        (
          <div key="notification"
            className="position-fixed app-notification w-100"
            style={defaultSettings.colors[type]}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="notification-tile m-0 mb-2">
                    <div className="d-flex justify-content-between pb-2">
                      <h5 className="m-0">{heading}</h5>
                      <button type="button" title="close" className="notification-close"
                        onClick={this.closeNotification.bind(this)}>
                        <i className="fas fa-times-circle"></i>
                      </button>
                    </div>
                    <div>
                      {message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ) : null
    );
  }
}

export default Notification;
