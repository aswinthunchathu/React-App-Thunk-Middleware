import React, { Component } from 'react';
import './index.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="site-Footer mt-auto">
        <div className="container text-muted">
          <div className="row">
            <div className="col">
              <div className="footer-elements">
                <div className="social-icons">
                  <i className="fab fa-facebook-square fa-2x clickable"></i>
                  <i className="fab fa-twitter-square fa-2x clickable"></i>
                  <i className="fab fa-instagram fa-2x clickable"></i>
                  <i className="fab fa-google-plus-square fa-2x clickable"></i>
                  <i className="fab fa-youtube-square fa-2x clickable"></i>
                </div>
                <p className="m-0 copy-write">© 2018 F1 World Championship Limited</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}


