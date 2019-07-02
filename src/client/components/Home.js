import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => (
  <div className="home">
    <h1>¡Hola, { user && user.legalName ? user.legalName.split(' ')[0] : '' }!</h1>
    <h2>¿Qué deseas hacer?</h2>
    <span className="spacer"/>
    <div className="shortcuts">
      {
        user.admin ? (
          <>
            <Link to="/new" className="shortcut">
              <i className="fas fa-user-plus fa-2x" style={ { color: "#8CBFB8", paddingBottom: 10 } }/>
              &nbsp;Nuevo Empleado
            </Link>
            <Link to="/employees" className="shortcut">
              <i className="fas fa-users fa-2x" style={ { color: "#8CBFB8", paddingBottom: 10 } }/>
              &nbsp;Mis Empleados
            </Link>
          </>
        ) : (
          <>
            <Link to={ "/employees/" + user.id } className="shortcut">
              <i className="fas fa-user-clock fa-2x" style={ { color: "#8CBFB8", paddingBottom: 10 } }/>
              &nbsp;Mi Reporte
            </Link>
          </>
        )
      }
    </div>
  </div>
);

export default Home;
