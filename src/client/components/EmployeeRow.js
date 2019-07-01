import React from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

const EmployeeRow = ({ employee }) => (
  <tr>
    <td style={{ width: '2%' }} className="align-center">
    </td>
    <td style={{ width: '20%' }}>
      <Link to={"/employees/"+ employee.id}>
        <span>{employee.legalName}</span>
      </Link>
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
  </tr>
);

export default EmployeeRow;
