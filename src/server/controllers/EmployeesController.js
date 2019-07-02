import Router from 'koa-router';
import moment from 'moment-timezone';
import User from '../models/User';
import Record from '../models/Record';
import requireAuth from '../middleware/requireAuth';
import { createContext } from 'vm';
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

EmployeesController.get('/record/:id', async (ctx) => {
  const [record] = await Record.getOne({id: ctx.params.id});
  ctx.body = record;
});

EmployeesController.get('/records/:id', async (ctx) => {
  ctx.body = await Record.get({user: ctx.params.id});
});

EmployeesController.get('/records/check-in/:id', async (ctx) => {
  const [lastCheckIn] = await Record.getLastCheckIn({user: ctx.params.id, updated_at: null});
  ctx.body = lastCheckIn;
});

EmployeesController.post('/records/:id', async (ctx) => {
  const payload = {
    ...ctx.request.body
  }
  ctx.body = await Record.create(payload);
});

EmployeesController.put('/records/:id', async (ctx) => {
  const payload = {
    ...ctx.request.body
  }
  ctx.body = await Record.update({id: ctx.params.id }, payload);
});

EmployeesController.put('/update/:id', async (ctx) => {
  const payload = {
    ...ctx.request.body
  }  
  ctx.body = await User.update({id: ctx.params.id }, payload);
});
export default EmployeesController;
