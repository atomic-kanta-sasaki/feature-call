import { cookies } from 'next/headers'
import { CustomError } from './CustomError';
import { jwtVerity } from './JwtVerify';
import { StatusCodeEnum } from './StatusCode';

type jwtPayload = {
  id: string,
  exp: number
}

export const getLoginUser = async () => {
  const token = cookies().get("token")
  if (!token) {
    throw new CustomError("トークンがありません", StatusCodeEnum.UNAUTHORIZED);
  }

  const jwt = await jwtVerity(token)
  const payload = jwt.payload as jwtPayload
  return payload.id
}