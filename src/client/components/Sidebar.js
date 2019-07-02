import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({user}) => (
  <div className="sidebar hide-on-med-and-down">
    <Link className="logo center-md" to="/">
      <i className="fas fa-history fa-5x"  style={{color:"#C28662", paddingBottom: 10}} />
      <h1 style={{color:"#fff"}}>Time control</h1>
    </Link>
    <nav>
      <li>
        {
          user.admin ? (
            <NavLink to="/new">
          <i className="fas fa-user-plus" />
          &nbsp;Nuevo Empleado
        </NavLink>
          ) : (
            <NavLink to={"/employees/" + user.id}>
            <i className="fas fa-user-clock" />
            &nbsp;Mi Reporte
            </NavLink>
          )
        }
      </li>
      <li>
        {
          user.admin ? (
            <NavLink to="/employees">
                <i className="fas fa-users" />
                &nbsp;Mis Empleados
            </NavLink>
          ) : (
          false
          )
        }
      </li>
      <li className="scrollable-nav">  
      </li>
    </nav>
    <nav className="extra">
      <li>
        {/* Algo extra */}
      </li>
    </nav>
  </div>
);

export default Sidebar;
