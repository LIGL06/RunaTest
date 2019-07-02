// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Components
import SignUpForm from '../components/SignUpForm';
// Actions
import { postSignUp } from '../actions/session';

class Login extends Component {
  state = {
    message: '',
    logginIn: true
  };

  handleSignup = (values) => {
    const { dispatch } = this.props;
    dispatch(
      postSignUp(values)
    );
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="titlebar">
            <h1>Nuevo Empleado</h1>
            <Link to="/employees">Mis empleados <i className="fas fa-users"/></Link>
          </div>
          <SignUpForm onSubmit={ this.handleSignup }/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ( {
  session: state.session
} );

export default connect(mapStateToProps)(Login);
