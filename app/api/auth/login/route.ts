import { PrismaClientManager } from "@/server/src/infrastructure/prisma/PrismaClientManager";
import { UserRepository } from "@/server/src/infrastructure/repository/users/UserRepository";
import { LoginUser } from "@/server/src/usecase/users/LoginUser";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const clientManager = new PrismaClientManager()
  const userRepository = new UserRepository(clientManager)
  const loginUser = new LoginUser(userRepository);
  const token = await loginUser.call(body)
  return NextResponse.json(token);
}