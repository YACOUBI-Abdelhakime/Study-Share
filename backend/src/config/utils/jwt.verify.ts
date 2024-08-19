import { verify } from 'jsonwebtoken';

export function jwtVerify(token: string) {
  const payload = verify(token, process.env.JWT_SECRET, {
    ignoreExpiration: false,
  });
  return payload;
}
