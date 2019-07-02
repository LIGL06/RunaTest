import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user }) => (
  <div className="header">
    <Link to="/profile">
      <i className="fas fa-user-alt"/>
      <span>&nbsp;{ user.legalName }</span>
    </Link>

    <Link to="/logout">
      <span className="logout"><i className="fas fa-sign-out-alt"/>&nbsp;Cerrar Sesión</span>
    </Link>
  </div>
);

export default Header;
