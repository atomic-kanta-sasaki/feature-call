import { LoginUser } from "@/server/src/usecase/users/LoginUser";
import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/server/src/shared/CustomError";
import { StatusCodeEnum } from "@/server/src/shared/StatusCode";
import { UserRepository } from "@/server/src/infrastructure/repository/users/UserRepository";
import { PrismaClientManager } from "@/server/src/infrastructure/prisma/PrismaClientManager";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const prismaClientManager = new PrismaClientManager()
    const userRepository = new UserRepository(prismaClientManager)
    const loginUser = new LoginUser(userRepository)
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