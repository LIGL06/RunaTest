// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import LoginForm from '../components/LoginForm';
// Actions
import { postLogin } from '../actions/session';

class Login extends Component {
  state = {
    message: '',
    loading: false
  };

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    dispatch(
      postLogin(values)
    ).then(() => this.setState({ loading: true }));
  };

  render() {
    const { message, loading } = this.state;
    return (
      <>
        {
          loading ? (
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"/>
              <div className="sk-cube sk-cube2"/>
              <div className="sk-cube sk-cube3"/>
              <div className="sk-cube sk-cube4"/>
              <div className="sk-cube sk-cube5"/>
              <div className="sk-cube sk-cube6"/>
              <div className="sk-cube sk-cube7"/>
              <div className="sk-cube sk-cube8"/>
              <div className="sk-cube sk-cube9"/>
            </div>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-xs-12 center-xs">
                  <i className="fas fa-history fa-5x" style={ { color: "#C28662", paddingTop: 100 } }/>
                  <h1 style={ { color: "#869197", paddingTop: 10 } }>Time control</h1>
                  <div className="wrapper-auth">
                    <div className="page">
                      { message ? (
                        <div className="alert alert-danger">
                          { message }
                        </div>
                      ) : null }
                      <LoginForm onSubmit={ this.handleSubmit }/>
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
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ( {
  ...state.session
} );

export default connect(mapStateToProps)(Login);
