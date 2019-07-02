// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
// Components
import CheckInForm from '../components/CheckInForm';
// Actions
import { postRecord } from '../actions/records';

class NewRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      momentStyle: false,
      loading: true
    }
  }

  changeView = () => {
    const { momentStyle } = this.state;
    this.setState({ momentStyle: !momentStyle });
  };

  handleSubmit = (values) => {
    const { dispatch, match } = this.props;
    const day = moment(values.day).format('YYYY-MM-DD');
    const formattedDay = day.split('T')[0];
    const created_at = moment(`${ values.created_at } am`, "HH:mm a").format();
    const formattedCreated = created_at.split('T')[1];
    const formattedStamp = `${ formattedDay }T${ formattedCreated }`;
    dispatch(
      postRecord({
        user: match.params.id,
        day: formattedDay,
        created_at: formattedStamp
      }, match.params.id)
    );
  };

  handleMomentSubmit = (event) => {
    event.preventDefault();
    const { dispatch, match } = this.props;
    const date = moment.tz('America/Monterrey').format();
    dispatch(
      postRecord({
        user: match.params.id,
        day: date,
        created_at: date
      }, match.params.id)
    );
  };

  render() {
    const { momentStyle } = this.state;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="titlebar">
            <h1>Nuevo Check-In</h1>
            <Link to="/employees">Mis empleados <i className="fas fa-users"/></Link>
          </div>
          {
            momentStyle ? (
              <form onSubmit={ this.handleMomentSubmit } className="container page">
                <div className="row">
                  <div className="col-xs-12 col-md-4">
                    <label htmlFor="day">Fecha y Hora</label>
                    <input name="day" type="data" value={ moment.tz('America/Monterrey').format('YYYY-MM-DD HH:mm:ss') }
                           disabled/>
                  </div>
                </div>
                <div className="row">
                  <button type="submit" className="primary col-md-offset-9">Crear Check-In</button>
                </div>
              </form>
            ) : (
              <CheckInForm onSubmit={ this.handleSubmit }/>
            )
          }
          <div className="row">
            <button className="neutral" onClick={ this.changeView }>{
              momentStyle ? 'Usar otra fecha y hora' : 'Usar actual'
            }</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ( {
  session: state.session,
  employee: state.employees.employee
} );

export default connect(mapStateToProps)(NewRecord);
