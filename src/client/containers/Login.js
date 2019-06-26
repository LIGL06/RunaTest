// Dependencies
import React, { Component }  from 'react';
import { connect } from 'react-redux';
// Components
import LoginForm from '../components/LoginForm';
import { postLogin } from '../actions/session';
import PropTypes from 'prop-types';
// Actions

class Login extends Component {
  static propTypes = {
    postLogin: PropTypes.func.isRequired
  };

  state = {
    message: '',
    session: ''
  };

  handleSubmit = (values) => {
    this.props.postLogin(values);
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
                  <LoginForm onSubmit={this.handleSubmit}/>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { postLogin })(Login);