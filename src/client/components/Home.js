import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => (
  <div className="home">
    <h1>¡Hola, {user && user.legalName ? user.legalName.split(' ')[0] : ''}!</h1>
    <h2>¿Qué deseas hacer?</h2>

    <span className="spacer" />

    <div className="shortcuts">
      <Link to="/new" className="shortcut">
        <img
          alt="Nuevo empleado"
        />
        Nuevo Empleado
      </Link>
      <Link to="/my-employees" className="shortcut">
        <img
          alt="Ver Mis Empleados"
        />
        Ver Mis Contratos
      </Link>
    </div>
  </div>
);

export default Home;
