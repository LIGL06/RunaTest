// Deps
import Router from 'koa-router';
// Routers
import SessionController from './controllers/SessionController';
import EmployeesController from './controllers/EmployeesController';

const router = Router();
const api = Router({ prefix: '/api' });
// Routers -> Init
api.use(SessionController.routes());
api.use(EmployeesController.routes());
// Handler
router.use(api.routes());

export default router;
