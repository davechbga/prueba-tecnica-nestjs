import { StringValue } from 'ms';

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default-secret-for-development-only',
  expiresIn: (process.env.JWT_EXPIRES_IN as StringValue) || '24h',
};
