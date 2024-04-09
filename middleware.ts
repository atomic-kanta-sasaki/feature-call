import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { jwtVerity } from './server/src/shared/JwtVerify';

export async function middleware(req: NextRequest) {
  const token = cookies().get("token")
  const jwtToken = jwtVerity(token)
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/auth/signup']
};