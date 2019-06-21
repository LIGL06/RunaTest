import jwt from 'jsonwebtoken';

const {JWT_SIGN} = process.env;

export default async function requireAuth(ctx, next) {
    const token = ctx.headers['x-jwt-token'];
    if (!token) {
        ctx.status = 403;
        ctx.body = {
            errors: ['Request is not authenticated']
        };
        next();
    }
    await new Promise((resolve) => {
        jwt.verify(token, JWT_SIGN, (err, data) => {
            if (err) {
                ctx.status = 401;
                ctx.body = {
                    errors: ['Invalid Session']
                };
            } else {
                ctx.session = data;
            }
            resolve();
        });
    });
    if (ctx.session) return next();
}
