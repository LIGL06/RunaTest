// Dependencies
import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
// Components

// Actions
import { getEmployee } from '../actions/employees';
import { getRecords, getLastCheckIn } from '../actions/records';


class EmployeePreview extends Component {
    static propTypes = {
        getEmployee: PropTypes.func.isRequired,
        getRecords: PropTypes.func.isRequired,
        getLastCheckIn: PropTypes.func.isRequired
    }

  state = {
    message: '',
    loading: true
  };

  componentDidMount(){
    const { match } = this.props;
    this.props.getEmployee(match.params.id).then(()=>{
      this.props.getRecords(match.params.id);
      this.props.getLastCheckIn(match.params.id);
      this.setState({loading: false});
    });
  }

  validateCheckIn(checkInDate, day){
    const time = moment(checkInDate),
      beforeTime = moment(day).add(7, 'hours').add(40, 'minutes'),
      afterTime = moment(day).add(8, 'hours').add(5, 'minutes');
    return <p className="mbm-10" style={{ color: time.isBetween(beforeTime, afterTime, 'minutes') ? '#869197' : '#f5a623' }}>Entrada: {moment(checkInDate).format("LTS")}</p>;
  }

  validateCheckOut(checkOutDate, day){
    const time = moment(checkOutDate),
      beforeTime = moment(day).add(15, 'hours').add(40, 'minutes'),
      afterTime = moment(day).add(16, 'hours').add(5, 'minutes');
    return <p className="mbm-10" style={{ color: time.isBetween(beforeTime, afterTime, 'minutes') ? '#869197' : '#f5a623' }}>Salida: {moment(checkOutDate).format("LTS")}</p>;
  }

  hasPendings(lastCheckIn, records) {
    const [lastRecord] = records;
    return moment(lastCheckIn.created_at).format('LL') == moment(lastRecord.created_at).format('LL');    
  }

  render() {
    const { employee, records, lastCheckIn, session } = this.props;
    const {loading} = this.state;
    return (
      <div className="contract">
        {
          loading && records.length ? false : (
            <>
              {
                session.admin ? (
                  <Link to="/employees" className="back">
                    &lt; Regresar a Mis Empleados
                  </Link>
                ) : (
                  <Link to="/profile" className="back">
                    &lt; Regresar a Mi Perfil
                  </Link>
                )
              }
              
              <div className="titlebar">
                <h1> {employee.legalName ? employee.legalName.split(' ')[0] : ''}</h1>
                {/* <span className={this.hasPendings(lastCheckIn, records) ? 'status m-t-15 pending' : 'status m-t-15 ready' }>{ this.hasPendings(lastCheckIn, records) ? 'Listo' : 'Pendiente de Check-out' }</span> */}
              </div>
            </>
          )
        }  
        {
          loading ? (
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"></div>
              <div className="sk-cube sk-cube2"></div>
              <div className="sk-cube sk-cube3"></div>
              <div className="sk-cube sk-cube4"></div>
              <div className="sk-cube sk-cube5"></div>
              <div className="sk-cube sk-cube6"></div>
              <div className="sk-cube sk-cube7"></div>
              <div className="sk-cube sk-cube8"></div>
              <div className="sk-cube sk-cube9"></div>
            </div>
          ) : (
            <div className="page padded">
            <div className="row">
              <div className="col-sm-7">
                <span>
                  Detalles
                </span>
                <p><b>Nombre:</b> {employee.legalName}</p>
                <p><b>RFC:</b> {employee.legalRfc}</p>
              </div>
              <div className="col-sm-5">
                <span>
                  Último Check-in pendiente
                </span>
                <p>{ lastCheckIn ? moment(lastCheckIn.created_at).format('LL') : 'No hay'}</p>
                <div className="row">
                  {
                    session.admin ? (
                      <Link to={ "/records/new/" + employee.id }>
                        <button className="primary">Nuevo Check-In +</button>
                      </Link>
                    ) : false
                  }
                </div>
              </div>
            </div>
  
            <div className="row">
              <div className="col-sm-12">
                <span>
                  Fechas pasadas
                </span>
                { records.length ? (
                  records.map(localRecord => (
                    <div className="row mtm-10" key={localRecord.day} style={{ color: '#555' }}>
                      <div className="col-sm-1">
                        <div className="align-center mt-15">
                          {
                            localRecord.signed ? (
                              <i
                                className="fas fa-check-circle"
                                style={{ color: '#7ED321' }} />
                            ) : (
                              <span>&nbsp;&nbsp;&nbsp;</span>
                            )
                          }
                          <span style={{ padding: 10 }}>{localRecord.turn}</span>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <p>Día: {moment(localRecord.day).format("LL")}</p>
                      </div>
                      <div className="col-sm-4">
                        {this.validateCheckIn(localRecord.created_at, localRecord.day)}
                      </div>
                      <div className="col-sm-4">
                        { localRecord.updated_at ? this.validateCheckOut(localRecord.updated_at, localRecord.day) : (<p>No registrada</p>) }
                      </div>
                    </div>
                  ))) : (<p className="align-center">No hay Check-ins</p>
                )}
              </div>
            </div>
  
            <div className="row">
            </div>
        </div>
          )
        }
    </div>
    );
  }
};

const mapStateToProps = (state) => ({
  employee: {...state.employees.employee},
  records: state.records.records,
  lastCheckIn: state.records.lastCheckIn,
  session: {...state.session.session.user}
});

export default connect(mapStateToProps, {getEmployee, getRecords, getLastCheckIn})(EmployeePreview);