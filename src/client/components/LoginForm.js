import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

class LoginForm extends Component {
  render (){
  const { error, handleSubmit } = this.props;
    return (
    <form onSubmit={handleSubmit} className="container page">
      <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <label htmlFor="email">Email</label>
        <Field name="email" component={renderField} type="email"/>
      </div>
      </div>
      <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <label htmlFor="password">Password</label>
        <Field name="password" component={renderField} type="password"/>
      </div>
      </div>
      <div className="row">
      <button type="submit" className="primary col-md-offset-9">Login</button>
      </div>
      {error && <strong>{error}</strong>}
    </form>
    );
  }
}
export default reduxForm({
  form: 'LoginForm'
})(LoginForm)