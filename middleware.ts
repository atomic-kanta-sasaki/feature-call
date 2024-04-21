import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { jwtVerity } from './server/src/shared/JwtVerify';
import { StatusCodeEnum } from './server/src/shared/StatusCode';

export async function middleware() {
  try {
    const token = cookies().get("token")
    if (!token) {
      return NextResponse.json({ error: 'ログイン情報がありません。再度ログインしてください' }, { status: StatusCodeEnum.UNAUTHORIZED });
    }
    await jwtVerity(token)
    return NextResponse.next();
  } catch (e) {
    return NextResponse.json({ error: 'ログインの有効期限が切れました。再度ログインしてください、' }, { status: StatusCodeEnum.FORBIDDEN });
  }
}

export const config = {
  matcher: ['/api/mypage']
};