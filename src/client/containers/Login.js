// Dependencies
import React, { Component }  from 'react';
import { connect } from 'react-redux';
// Components
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { postLogin, postSignUp } from '../actions/session';
import PropTypes from 'prop-types';
// Actions

class Login extends Component {
  static propTypes = {
    postLogin: PropTypes.func.isRequired,
    postSignUp: PropTypes.func.isRequired
  };

  state = {
    message: '',
    logginIn: true
  };

  changeView = () => {
    const { logginIn } = this.state;
    this.setState({logginIn: !logginIn});
  }

  handleSubmit = (values) => {
    this.props.postLogin(values).then(response => console.log(response));
  };

  handleSignup = (values) => {
    this.props.postSignUp(values).then(response => console.log(response));
  };

  render() {
    const { message, logginIn } = this.state;
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
                  {
                    logginIn ? (
                    <LoginForm onSubmit={this.handleSubmit}/>) : (
                    <SignUpForm onSubmit={this.handleSignup}/>)
                  }
                  <button onClick={this.changeView} className="neutral">{
                    logginIn ? 'Regístrase' : 'Iniciar'
                  }</button>
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

export default connect(mapStateToProps, { postLogin, postSignUp })(Login);