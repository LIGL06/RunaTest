import Router from 'koa-router';
import User from '../models/User';
import Record from '../models/Record';
import requireAuth from '../middleware/requireAuth';

require('dotenv')
  .config();
const EmployeesController = Router({
  prefix: '/employees'
});
EmployeesController.use(requireAuth);

EmployeesController.get('/list', async (ctx) => {
  try {
    ctx.body = await User.get({ admin: false });
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Error trying to access Employees'};
  }
});

EmployeesController.get('/get/:id', async (ctx) => {
  try {
    const [id] = await User.get({
      id: ctx.params.id
    });
    ctx.body = {
      ...id
    };
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Error trying to access Employee'};
  }
});

EmployeesController.get('/record/:id', async (ctx) => {
  try {
    const [record] = await Record.getOne({ id: ctx.params.id });
    ctx.body = record;
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Error trying to access Record'};
  }
});

EmployeesController.get('/records/:id', async (ctx) => {
  try {
    ctx.body = await Record.get({ user: ctx.params.id });
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Error trying to access Records of User'};
  }
});

EmployeesController.get('/records/check-in/:id', async (ctx) => {
  try {
    const [lastCheckIn] = await Record.getLastCheckIn({ user: ctx.params.id, updated_at: null });
    ctx.body = lastCheckIn;
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Error trying to access last pending record'};
  }
});

EmployeesController.post('/records/:id', async (ctx) => {
  try {
    const payload = {
      ...ctx.request.body
    };
    ctx.body = await Record.create(payload);
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Error trying to create Record'};
  }
});

EmployeesController.put('/records/:id', async (ctx) => {
  try {
    const payload = {
      ...ctx.request.body
    };
    ctx.body = await Record.update({ id: ctx.params.id }, payload);
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Error trying to update Record'};
  }
});

EmployeesController.put('/update/:id', async (ctx) => {
  try {
    const payload = {
      ...ctx.request.body
    };
    ctx.body = await User.update({ id: ctx.params.id }, payload);
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Error trying to update Employee'};
  }
});
export default EmployeesController;
