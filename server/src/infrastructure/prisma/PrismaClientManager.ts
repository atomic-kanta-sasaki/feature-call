import { Prisma, PrismaClient } from '@prisma/client';
import prisma from './prismaClient';
import { IDataAccessClientManager } from '../shared/IDataAccessClientManager';

type Client = PrismaClient | Prisma.TransactionClient;
export class PrismaClientManager implements IDataAccessClientManager<Client> {
  private client: Client = prisma;

  setClient(client: Client): void {
    this.client = client;
  }

  getClient() {
    return this.client;
  }
}
