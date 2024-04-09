import { SignJWT, jwtVerify } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from 'next/headers'

export const jwtVerity = async (token: RequestCookie | undefined) => {
  if (!token) throw new Error("ログインしてください");
  const secretKey = new TextEncoder().encode("prisma-supabase");
  const decodedJWT = await jwtVerify(token.value, secretKey);
  return decodedJWT;
}

export const setJwtToken = async (id: string) => {
  const jwtPayload = {
    id: id
  }
  const secretKey = new TextEncoder().encode("prisma-supabase");
  const token = await new SignJWT(jwtPayload).setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secretKey);

  cookies().set({ name: "token", value: token })
}