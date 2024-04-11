import { container, Lifecycle } from 'tsyringe';
import { PrismaTransactionManager } from '../infrastructure/prisma/PrismaTransactionManager';
import { PrismaClientManager } from '../infrastructure/prisma/PrismaClientManager';
import { UserRepository } from '../infrastructure/repository/users/UserRepository';

container.register('IDataAccessClientManager', {
  useClass: PrismaClientManager
})

container.register('ITransactionManager', {
  useClass: PrismaTransactionManager
})

container.register('IUserRepository', {
  useClass: UserRepository
})


