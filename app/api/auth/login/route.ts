import "reflect-metadata";
import "../../../../server/src/DIContainer/Program"
import { LoginUser } from "@/server/src/usecase/users/LoginUser";
import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/server/src/shared/CustomError";
import { StatusCodeEnum } from "@/server/src/shared/StatusCode";
import { container } from 'tsyringe';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const loginUser = container.resolve(LoginUser)
    const token = await loginUser.call(body)
    return NextResponse.json({ token }, { status: StatusCodeEnum.OK });
  } catch (e) {
    if (e instanceof CustomError) {
      return NextResponse.json({ error: e.message }, { status: e.statusCode });
    } else {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: StatusCodeEnum.INTERNAL_SERVER_ERROR });
    }
  }

}