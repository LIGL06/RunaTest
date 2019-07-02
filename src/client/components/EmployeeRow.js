import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeRow = ({ employee }) => (
  <tr>
    <td className="align-center">
    </td>
    <td className="legalName">
      <Link to={ "/employees/" + employee.id }>
        <span>{ employee.legalName }</span>
      </Link>
    </td>
    <td className="align-left">
      { employee.legalRfc }
    </td>
    <td className="align-left">
      { employee.email }
    </td>
  </tr>
);

export default EmployeeRow;
