import Router from 'koa-router';
import moment from 'moment-timezone';
import User from '../models/User';
import requireAuth from '../middleware/requireAuth';
require('dotenv')
  .config();
const EmployeesController = Router({
  prefix: '/employees'
});
EmployeesController.use(requireAuth);

EmployeesController.get('/list', async (ctx) => {
  ctx.body = await User.get({admin: false});
});

EmployeesController.get('/get/:id', async (ctx) => {
  const [id] = await User.get({
    id: ctx.params.id
  });
  ctx.body = {
    ...id
  };
});

export default EmployeesController;
