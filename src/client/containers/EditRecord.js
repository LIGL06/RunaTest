// Dependencies
import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
// Components
import CheckOutForm from '../components/CheckOutForm';
// Actions
import { putRecord, getRecord } from '../actions/records';

class EditRecord extends Component {
    static propTypes = {
        getRecord: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            momentStyle: false,
            loading: true
        }
    }

  componentDidMount(){
    const {match} = this.props;
    this.props.getRecord(match.params.id).then(()=>{
        this.setState({loading: false});
        console.log(this.props);
    });
  }

  changeView = () => {
    const { momentStyle } = this.state;
    this.setState({momentStyle: !momentStyle});
  }

  handleSubmit = (values) => {
    const {match} = this.props;
    const day = moment(values.day).format('YYYY-MM-DD');
    const formattedDay = day.split('T')[0];
    const updated_at = moment(`${values.updated_at} am`, "HH:mm a").format();
    const fromattedCreated= updated_at.split('T')[1];
    const formattedStamp = `${formattedDay}T${fromattedCreated}`;
    this.props.putRecord({
        day: formattedDay,
        updated_at: formattedStamp
      }, match.params.id);
  };

  handleMomentSubmit = (event) => {
    event.preventDefault();
    const {match} = this.props;
    const date = moment.tz('America/Monterrey').format('YYYY-MM-DD HH:mm:ss');
    this.props.putRecord({
        day: date,
        updated_at: date
      }, match.params.id);
  };

  render() {
    const { record } = this.props
    const { momentStyle } = this.state;
    return (
      <div className="row">
      <div className="col-md-12">
        <div className="titlebar">
          <h1>Check-Out - {moment(record.created_at).format('LL')}</h1>
          <Link to="/employees">Mis empleados <i className="fas fa-users" /></Link>
        </div>
        {
            momentStyle ? (
            <form onSubmit={this.handleMomentSubmit} className="container page">
                <div className="row">
                  <div className="col-xs-12 col-md-4">
                    <label htmlFor="day">Fecha y Hora</label>
                    <input name="day" type="data" value={moment.tz('America/Monterrey').format('YYYY-MM-DD HH:mm:ss')} disabled/>
                  </div>
                </div>
                <div className="row">
                  <button type="submit" className="primary col-md-offset-9">Crear Check-Out</button>
                </div>
            </form>
            ) : (
                <CheckOutForm onSubmit={this.handleSubmit} />
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
  employee: state.employees.employee,
  record: state.records.record
});

export default connect(mapStateToProps, {getRecord, putRecord})(EditRecord);