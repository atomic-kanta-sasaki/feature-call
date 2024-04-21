import { GetUser } from "@/server/src/usecase/users/GetUser"
import { NextResponse } from "next/server";
import { StatusCodeEnum } from "@/server/src/shared/StatusCode";
import { CustomError } from "@/server/src/shared/CustomError";
import { UserRepository } from "@/server/src/infrastructure/repository/users/UserRepository";
import { PrismaClientManager } from "@/server/src/infrastructure/prisma/PrismaClientManager";
import { GetCurrentUser } from "@/server/src/usecase/users/GetCurrentUser";

export const GET = async () => {
  try {
    const prismaClientManager = new PrismaClientManager()
    const userRepository = new UserRepository(prismaClientManager);
    const getUser = new GetUser(userRepository);
    const getCurrentUser = new GetCurrentUser();
    const userId = await getCurrentUser.call();
    const user = await getUser.call(userId)
    return NextResponse.json(user, { status: StatusCodeEnum.OK });
  } catch (e) {
    if (e instanceof CustomError) {
      return NextResponse.json({ error: e.message }, { status: e.statusCode });
    } else {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: StatusCodeEnum.INTERNAL_SERVER_ERROR });
    }
  }
}