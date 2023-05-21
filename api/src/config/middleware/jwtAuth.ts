import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import app from '@/config/server/server';
import HttpError from '@/config/error';
import * as http from 'http';

interface RequestWithUser extends Request {
  user: object | string;
}

/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export function isAuthenticated(req: RequestWithUser, res: Response, next: NextFunction): void {
  // TODO: 3) Get the token from the cookie and modify Bearer prerfix

  const token: any = req.cookies.token;

  if (token) {
    try {
      const user: object | string = jwt.verify(token, app.get('secret'));

      req.user = user;

      return next();
    } catch (error) {
      return next(
        new HttpError(HttpStatus.UNAUTHORIZED, http.STATUS_CODES[HttpStatus.UNAUTHORIZED])
      );
    }
  }

  return next(new HttpError(HttpStatus.BAD_REQUEST, 'No token provided'));
}
