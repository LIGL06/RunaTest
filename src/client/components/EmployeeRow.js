import React from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

const EmployeeRow = ({ employee }) => (
  <tr>
    <Link to={"/employees/"+ employee.id}>
    <td style={{ width: '2%' }} className="align-center">
    </td>
    <td style={{ width: '20%' }}>
      <span>{employee.legalName}</span>
    </td>
    <td className="align-center" style={{ width: '20%' }}>
    {employee.legalRfc}
    </td>
    <td className="align-center" style={{ width: '20%' }}>
    {moment(employee.created_at).tz('America/Monterrey').calendar()}
    </td>
    <td className="align-center" style={{ width: '20%' }}>
    {moment(employee.updated_at).tz('America/Monterrey').calendar()}
    </td>
    </Link>
  </tr>
);

export default EmployeeRow;
