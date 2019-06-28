import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({user}) => (
  <div className="header">
    <Link to="/perfil">
    <i className="fas fa-user-alt" />
    &nbsp;<span>{user.legalName}</span>
    </Link>

    <Link to="/logout">
      <span className="logout"><i className="fas fa-sign-out-alt" />Cerrar Sesión</span>
    </Link>
  </div>
);

export default Header;
