// Dependencies
import React, { Component }  from 'react';
import PropTypes from 'prop-types';
// Components
import LoginForm from '../components/LoginForm';
// Actions
import { login } from '../epics/session'

export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  state = {
    message: ''
  };

  handleSubmit = (values) => {
    this.props.login(values.email, values.password);
  };

  render() {
    const { message } = this.state;
    return (
      <>
        <div className="container">
          <img
            className="auth-logo"
            alt="Logo"
            style={ { maxWidth: 320, marginBottom: 30 } }/>
          <div className="row">
            <div className="col-xs-12">
              <div className="wrapper-auth">
                <div className="page">
                  { message ? (
                    <div className="alert alert-danger">
                      { message }
                    </div>
                  ) : null }
                  <LoginForm onSubmit={ this.handleSubmit } />
                </div>
                <p className="center">

                </p>
                <a href="https://www.linkedin.com/in/luisgarcialuna/" className="center">
                  LinkedIn
                </a>
                &nbsp;
                <a href="https://github.com/LIGL06" className="center">
                  Github
                </a>
              </div>
            </div>
          </div>

        </div>
      </>
    );
  }
};
