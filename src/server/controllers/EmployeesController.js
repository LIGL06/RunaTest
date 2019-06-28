import Router from 'koa-router';
import moment from 'moment-timezone';
import Employee from '../models/Employee';
import requireAuth from '../middleware/requireAuth';
require('dotenv')
  .config();
const EmployeesController = Router({
  prefix: '/employees'
});
EmployeesController.use(requireAuth);

EmployeesController.get('/list', async (ctx) => {
    ctx.body = {
        employees: []
    };
//   ctx.body = await Employee.get({});
});

EmployeesController.get('/get/:id', async (ctx) => {
  const [id] = await Employee.get({
    id: ctx.params.id
  });
  ctx.body = {
    ...id
  };
});

export default EmployeesController;
