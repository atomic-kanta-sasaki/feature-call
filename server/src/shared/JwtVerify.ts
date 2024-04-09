import { SignJWT, jwtVerify } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from 'next/headers'
import { CustomError } from "./CustomError";
import { StatusCodeEnum } from "./StatusCode";
export const jwtVerity = async (token: RequestCookie | undefined) => {
  if (!token) throw new CustomError("ログインしてください", StatusCodeEnum.UNAUTHORIZED);
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const decodedJWT = await jwtVerify(token.value, secretKey);
  return decodedJWT;
}

export const setJwtToken = async (id: string) => {
  const jwtPayload = {
    id: id
  }
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  const token = await new SignJWT(jwtPayload).setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secretKey);
  cookies().set({ name: "token", value: token })
  return token
}