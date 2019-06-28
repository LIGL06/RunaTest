import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => (
  <div className="home">
    <h1>¡Hola, {user && user.legalName ? user.legalName.split(' ')[0] : ''}!</h1>
    <h2>¿Qué deseas hacer?</h2>
    
    <span className="spacer" />

    <div className="shortcuts">
      <Link to="/new" className="shortcut">
        <i className="fas fa-user-plus" />
        &nbsp;Nuevo Empleado
      </Link>
      <Link to="/employees" className="shortcut">
        <i className="fas fa-users" />
        &nbsp;Mis Empleados
      </Link>
    </div>
  </div>
);

export default Home;
