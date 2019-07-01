// Dependencies
import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
// Components
import CheckInForm from '../components/CheckInForm';
// Actions


class NewRecord extends Component {
  state = {
    message: '',
    momentStyle: true
  };

  changeView = () => {
    const { momentStyle } = this.state;
    this.setState({momentStyle: !momentStyle});
  }

  handleSubmit = (values) => {
    const {dispatch} = this.props;
  };

  handleMomentSubmit = (event) => {
    event.preventDefault();
  };

  handleChange(event){

  }

  render() {
    const { momentStyle } = this.state;
    return (
      <div className="row">
      <div className="col-md-12">
        <div className="titlebar">
          <h1>Nuevo Check-In</h1>
          <Link to="/employees">Mis empleados <i className="fas fa-users" /></Link>
        </div>
        {
            momentStyle ? (
            <form onSubmit={this.handleMomentSubmit} className="container page">
                <div className="row">
                  <div className="col-xs-12 col-md-4">
                    <label htmlFor="day">Fecha y Hora</label>
                    <input name="day" type="data" value={moment().format()} onChange={this.handleChange} disabled/>
                  </div>
                </div>
                <div className="row">
                  <button type="submit" className="primary col-md-offset-9">Crear Check-In</button>
                </div>
            </form>
            ) : (
                <CheckInForm onSubmit={this.handleSubmit} />
            )
        }
        <div className="row">
            <button className="neutral" onClick={this.changeView}>{
                momentStyle ? 'Usar otra fecha y hora' : 'Usar actual'
            }</button>
        </div>
      </div>
    </div>
    );
  }
};

const mapStateToProps = (state) => ({
  session: state.session,
  employee: state.employees.employee
});

export default connect(mapStateToProps)(NewRecord);