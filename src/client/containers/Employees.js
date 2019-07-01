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
                <div className="page">
                  <table>
                    <tbody>
                    <tr className="row">
                      <th style={{ width: '1%' }}/>
                      <th style={{ width: '45%' }}>Nombre</th>
                      <th style={{ width: '20%' }}>RFC</th>
                      <th style={{ width: '15%' }}>E-mail</th>
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
