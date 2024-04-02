import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  return NextResponse.json('hello worldsss');
}

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  console.log(body)
  return NextResponse.json('post ok');
}