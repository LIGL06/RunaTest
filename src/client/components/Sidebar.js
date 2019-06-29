import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({user}) => (
  <div className="sidebar hide-on-med-and-down">
    <Link className="logo" to="/">
      <i className="fas fa-history fa-5x" />
      <br />
      Time control
    </Link>
    <nav>
      <li>
        <NavLink to="/new">
          <i className="fas fa-user-plus" />
          &nbsp;Nuevo Empleado
        </NavLink>
      </li>
      <li>
        <NavLink to="/employees">
        <i className="fas fa-users" />
        &nbsp;Mis Empleados
        </NavLink>
      </li>
      <li className="scrollable-nav">  
      </li>
    </nav>
    <nav className="extra">
      <li>

      </li>
    </nav>
  </div>
);

export default Sidebar;
