import jwt from 'jsonwebtoken';
import Router from 'koa-router';
import moment from 'moment-timezone';
import bcrypt from 'bcrypt';
import {
  logger
} from '../modules';
import User from '../models/User';

require('dotenv')
  .config();

const SessionController = Router({
  prefix: '/session'
});

SessionController.post('/register', async (ctx) => {
  const payload = {
    ...ctx.request.body
  };
  const [user] = await User.get({
    email: payload.email
  });
  if (!user) {
    await new Promise((resolve, reject) => {
      bcrypt.hash(payload.password, 10, async (err, hash) => {
        if (err) reject(err);
        const userFields = {
          legalName: payload.legalName,
          legalRfc: payload.legalRfc,
          password: hash,
          email: payload.email,
          created_at: moment.tz('America/Monterrey')
            .format('YYYY-MM-DD HH:mm:ss'),
          admin: false
        };
        try {
          await User.create(userFields);
          logger.info('New user registration', {
            ...userFields
          });
          ctx.body = {
            ...userFields
          };
          resolve();
        } catch {
          reject(new Error('Create User Error'));
        }
      });
    });
  } else {
    ctx.status = 401;
    ctx.body = {
      error: 'Usuario registrado'
    };
  }
});

SessionController.post('/login', async (ctx) => {
  const payload = {
    ...ctx.request.body
  };
  if (!ctx.request.body.password) {
    ctx.status = 401;
    ctx.body = {
      error: 'No password sent'
    };
    return;
  }
  let status = false;
  const [user] = await User.get({
    email: payload.email
  });
  if (!user) {
    ctx.status = 401;
    ctx.body = {
      error: 'Invalid credentials'
    };
    return;
  }
  const session = {
    user: {
      id: user.id,
      legalName: user.legalName,
      legalRfc: user.legalRfc,
      email: user.email,
      admin: user.admin
    }
  };
  await new Promise((resolve, reject) => {
    bcrypt.compare(payload.password, user.password).then((res) => {
      if (res) {
        status = true;
        jwt.sign(session, process.env.JWT_SIGN, {
          expiresIn: '2h'
        }, (err, token) => {
          if (err) reject(err);
          logger.info(`Session created: ${ session.user.legalName }, ${ session.user.legalRfc }`);
          ctx.body = {
            session,
            token
          };
          resolve();
        });
      } else {
        ctx.status = 401;
        ctx.body = {
          error: 'Invalid credentials'
        };
        resolve();
      }
    });
  });
});

export default SessionController;
