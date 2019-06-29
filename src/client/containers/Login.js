// Dependencies
import React, { Component }  from 'react';
import { connect } from 'react-redux';

// Components
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { postLogin, postSignUp } from '../actions/session';
// Actions

class Login extends Component {
  state = {
    message: '',
    logginIn: true
  };

  changeView = () => {
    const { logginIn } = this.state;
    this.setState({logginIn: !logginIn});
  }

  handleSubmit = (values) => {
    const {dispatch} = this.props;
    dispatch(
      postLogin(values)
    );
  };

  handleSignup = (values) => {
    const {dispatch} = this.props;
    dispatch(
      postSignUp(values)
    );
  };

  render() {
    const { message, logginIn } = this.state;
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 center-md">
            <i className="fas fa-history fa-5x" />
            <h1>Time control</h1>
              <div className="wrapper-auth">
                <div className="page">
                  { message ? (
                    <div className="alert alert-danger">
                      { message }
                    </div>
                  ) : null }
                  <LoginForm onSubmit={this.handleSubmit}/>
                  {/* {
                    logginIn ? (
                    <LoginForm onSubmit={this.handleSubmit}/>) : (
                    <SignUpForm onSubmit={this.handleSignup}/>)
                  } */}
                  {/* <button onClick={this.changeView} className="neutral">{
                    logginIn ? 'Regístrase' : 'Iniciar'
                  }</button> */}
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

const mapStateToProps = (state) => ({
  session: state.session
});

export default connect(mapStateToProps)(Login);