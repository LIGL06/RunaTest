import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class CheckInForm extends Component {
  render() {
    const { error, handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit } className="container page">
        <div className="row">
          <div className="col-xs-6">
            <label htmlFor="day">Día</label>
            <Field name="day" component="input" type="date"/>
          </div>
          <div className="col-xs-6">
            <label htmlFor="created_at">Hora</label>
            <Field name="created_at" component="input" type="time"/>
          </div>
        </div>
        <div className="row">
          <button type="submit" className="primary col-md-offset-9">Crear Check-In</button>
          { error && <strong>{ error }</strong> }
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'CheckInForm'
})(CheckInForm)
