import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {
  render() {
    const { error, handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit } className="container">
        <div className="row">
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" component="input" type="email" disabled/>
          </div>
        </div>
        <div className="row">
          <div>
            <label htmlFor="legalRfc">RFC</label>
            <Field name="legalRfc" component="input" type="text" disabled/>
          </div>
        </div>
        <div className="row">
          <button type="submit" className="primary col-md-offset-9">Login</button>
        </div>
        { error && <strong>{ error }</strong> }
      </form>
    );
  }
}

export default reduxForm({
  form: 'LoginForm'
})(LoginForm)
