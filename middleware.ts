import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { jwtVerity } from './server/src/shared/JwtVerify';
import { StatusCodeEnum } from './server/src/shared/StatusCode';

export async function middleware(req: NextRequest) {
  try {
    const token = cookies().get("token")
    if (!token) {
      return NextResponse.json({ message: 'Token not found' }, { status: StatusCodeEnum.UNAUTHORIZED });
    }

    const jwt = await jwtVerity(token)
    return NextResponse.next();
  } catch (e) {
    return NextResponse.json({ message: 'Invalid token' }, { status: StatusCodeEnum.UNAUTHORIZED });
  }

}

export const config = {
  matcher: ['/api/mypage/:path*']
};