import Router from 'koa-router';

const router = Router();
const api = Router({prefix: '/api'});
router.use(api.routes());

export default router;
