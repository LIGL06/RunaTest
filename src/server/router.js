import Router from 'koa-router';
// Routers
import SessionController from './controllers/SessionController';

const router = Router();
const api = Router({prefix: '/api'});
// Routers -> Init
api.use(SessionController.routes());
// Handler
router.use(api.routes());

export default router;
