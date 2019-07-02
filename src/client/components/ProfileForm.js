// Deps
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class ProfileForm extends Component {
  render() {
    const { error, handleSubmit, user } = this.props;
    return (
      <form onSubmit={ handleSubmit } className="container page">
        <div className="row">
          <div className="col-xs-6">
            <label htmlFor="legalName">Nombre</label>
            <Field name="legalName" component="input" type="text" placeholder={ user.legalName }
                   disabled={ !user.admin }/>
          </div>
          <div className="col-xs-6">
            <label htmlFor="email">E-mail</label>
            <Field name="email" component="input" type="email" placeholder={ user.email }/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            <label htmlFor="legalRfc">RFC</label>
            <Field name="legalRfc" component="input" type="text" placeholder={ user.legalRfc }
                   disabled={ !user.admin }/>
          </div>
        </div>
        <div className="row">
          <button type="submit" className="primary col-xs-offset-9">Actualizar</button>
        </div>
        { error && <strong>{ error }</strong> }
      </form>
    )
  }
}

export default reduxForm({
  form: 'ProfileForm'
})(ProfileForm);
