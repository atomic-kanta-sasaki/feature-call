import { PrismaClientManager } from "@/server/src/infrastructure/prisma/PrismaClientManager";
import { PrismaTransactionManager } from "@/server/src/infrastructure/prisma/PrismaTransactionManager";
import { UserRepository } from "@/server/src/infrastructure/repository/users/UserRepository";
import { CreateUser, UserCreateRequest } from "@/server/src/usecase/users/CreateUser";
import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/server/src/shared/CustomError";
import { StatusCodeEnum } from "@/server/src/shared/StatusCode";

export const POST = async (request: NextRequest) => {
  try {
    const body: UserCreateRequest = await request.json()
    const clientManager = new PrismaClientManager();
    const transactionManager = new PrismaTransactionManager(clientManager);
    const userRepository = new UserRepository(clientManager);
    const createUser = new CreateUser(userRepository, transactionManager);
    await createUser.call(body)

    return NextResponse.json({ message: 'Success' }, { status: StatusCodeEnum.OK });
  } catch (e) {
    if (e instanceof CustomError) {
      return NextResponse.json({ error: e.message }, { status: e.statusCode });
    } else {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: StatusCodeEnum.INTERNAL_SERVER_ERROR });
    }
  }
}