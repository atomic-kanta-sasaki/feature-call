import { PrismaClientManager } from "@/server/src/infrastructure/prisma/PrismaClientManager";
import { PrismaTransactionManager } from "@/server/src/infrastructure/prisma/PrismaTransactionManager";
import { UserRepository } from "@/server/src/infrastructure/repository/users/UserRepository";
import { CreateUser, UserCreateRequest } from "@/server/src/usecase/users/CreateUser";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body: UserCreateRequest = await request.json()
    const clientManager = new PrismaClientManager();
    const transactionManager = new PrismaTransactionManager(clientManager);
    const userRepository = new UserRepository(clientManager);
    const createUser = new CreateUser(userRepository, transactionManager);
    createUser.call(body)

    return NextResponse.json('post ok');
  } catch (e) {
    return NextResponse.json(e.message)
  }

}