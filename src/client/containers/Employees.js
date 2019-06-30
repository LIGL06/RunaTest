// Deps
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Actions 
import { getEmployees } from '../actions/employees';
// Components
import EmployeeRow from '../components/EmployeeRow';

class Employees extends React.Component {
  static propTypes = {
    getEmployees: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
   this.props.getEmployees().then(()=>{
     this.setState({loading: false});
   });
  }

  render() {
    const {employees} = this.props; 
    const {loading} = this.state;
    return (
      <div className="row">
      <div className="col-md-12">
        <div className="titlebar">
          <h1>Mis Empleados</h1>
          <Link to="/new">Nuevo +</Link>
        </div>
        {employees.length ? (
          <>
          {loading ? (
                <div className="sk-circle">
                  <img
                    alt="loader"
                    src="/assets/images/loader.gif" />
                </div>
              ) : (
                <div className="page">
                  <table>
                    <tbody>
                    <tr className="row">
                      <th style={{ width: '1%' }}/>
                      <th style={{ width: '27%' }}>Nombre</th>
                      <th style={{ width: '22%' }}>RFC</th>
                      <th style={{ width: '20%' }}>Última entrada</th>
                      <th style={{ width: '15%' }}>Última salida</th>
                    </tr>
                    </tbody>
                  </table>
                  <div className="scrollable">
                    <table>
                      <tbody>
                      {employees.map(employee => (
                        <EmployeeRow
                          employee={employee}
                          key={employee.id} />
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

          </>
        ) : (
          <>
          <div className="empty">
            <h2>No hay empleados</h2>
            <Link to="/new">Agregar uno nuevo +</Link>
          </div>
          </>
        )}
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.employees
});

export default connect(mapStateToProps, {getEmployees})(Employees);
