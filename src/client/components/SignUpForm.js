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

class SignUpForm extends Component {
  render (){
  const { error, handleSubmit } = this.props;
    return (
    <form onSubmit={handleSubmit} className="container">
      <div className="row">
        <div>
          <label htmlFor="legalName">Nombre</label>
          <Field name="legalName" component={renderField} type="text"/>
        </div>
        <div>
          <label htmlFor="legalRfc">RFC</label>
          <Field name="legalRfc" component={renderField} type="text"/>
        </div> 
      </div>
      <div className="row">
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component={renderField} type="email"/>
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component={renderField} type="password"/>
        </div>
      </div>
      <div className="row">
        <button type="submit" className="primary col-md-offset-9">Registro</button>
        {error && <strong>{error}</strong>}
      </div>
    </form>
    );
  }
}
export default reduxForm({
  form: 'SignUpForm'
})(SignUpForm)