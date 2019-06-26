import jwt from 'jsonwebtoken';
import Router from 'koa-router';
import moment from 'moment-timezone';
import { logger } from '../modules';
import User from '../models/User';

require('dotenv')
  .config();

const SessionController = Router({ prefix: '/session' });

SessionController.post('/login', async (ctx) => {
  const payload = {
      ...ctx.request.body
  };
  if (!ctx.request.body.password) {
    ctx.status = 400;
    ctx.body = { error: 'Credenciales inválidas' };
    return;
  }  
  const [user] = await User.get({ email: payload.email });
  if (!user) {
    const userFields = {
      createdAt: moment.tz('America/Monterrey')
        .format('YYYY-MM-DD HH:mm:ss'),
    };
    try {
        const [newId] = await User.create(userFields);    
    } catch (e) {
      ctx.status = 401;
      ctx.body = { error: 'Error al crear empleado' };
    }
    id = newId;
    logger.info('New user registration', {
      ...userFields,
      id
    });
  }
  // Session object
  const session = {
    user: {
      id: id || user.id,
      legalName,
      legalRfc,
      email
    }
  };
  /**
   * Creates Session of User
   */
  await new Promise((resolve, reject) => {
    jwt.sign(session, process.env.JWT_SIGN, { expiresIn: '2h' }, (err, token) => {
    if (err) reject(err);
    logger.info(`Session created: ${legalName}, ${legalRfc}`);
    ctx.body = {
        session,
        token
    };
    resolve();
    });
  });
});

export default SessionController;
