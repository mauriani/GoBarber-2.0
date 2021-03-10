import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token jwt

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }
  // a virgula indica que desejo apenas a segunda posição do array
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // forçando o formato do meu decoded

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
