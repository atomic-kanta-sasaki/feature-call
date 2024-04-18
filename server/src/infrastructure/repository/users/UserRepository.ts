import { Email } from '@/server/src/domain/models/users/ValueObject/Email';
import { $Enums } from '@prisma/client';
import { User } from '../../../domain/models/users/User';
import { UserId } from '../../../domain/models/users/ValueObject/Id';
import { Status, StatusEnum } from '../../../domain/models/users/ValueObject/Status';
import { IUserRepository } from "../../../interface/users/IUserRepository";
import { PrismaClientManager } from '../../prisma/PrismaClientManager';

export class UserRepository implements IUserRepository {
  constructor(
    private clientManager: PrismaClientManager
  ) { }

  private statusEnumMapper(status: $Enums.Status): Status {
    switch (status) {
      case 'Active':
        return new Status(StatusEnum.Active);
      case 'DisActive':
        return new Status(StatusEnum.DisActive);
    }
  }

  async save(user: User) {
    const client = this.clientManager.getClient();
    await client.user.create({
      data: {
        id: user.Id.value,
        email: user.Email.value,
        password: user.Password
      }
    })
  }

  async update(user: User) {
    const client = this.clientManager.getClient();

    await client.user.update({
      where: {
        id: user.Id.value
      },
      data: {
        email: user.Email.value,
        password: user.Password
      }
    })
  }

  async delete(user: User) {
    // await prisma.user.update({
    //   where: {
    //     id: user.Id.value
    //   },
    //   data: {
    //     status:
    //   }
    // })
  }

  async find(Id: UserId) {
    const client = this.clientManager.getClient();

    const data = await client.user.findUnique({
      where: {
        id: Id.value
      }
    })

    if (!data) {
      return null
    }

    return User.reconstruct(
      new UserId(data.id),
      new Email(data.email || ''),
      data.password,
      data.name || '',
      this.statusEnumMapper(data.status)
    )
  }

  async findByEmail(email: string) {
    const client = this.clientManager.getClient();

    const data = await client.user.findUnique({
      where: {
        email: email
      }
    })

    if (!data) {
      return null;
    }

    return User.reconstruct(
      new UserId(data.id),
      new Email(data.email || ''),
      data.password,
      data.name || '',
      this.statusEnumMapper(data.status)
    )
  }

  async findAll() {
    const client = this.clientManager.getClient();

    const data = await client.user.findMany({})

    if (!data) {
      return null
    }

    const users = data.map(user =>
      User.reconstruct(
        new UserId(user.id),
        new Email(user.email || ''),
        user.password,
        user.name || '',
        this.statusEnumMapper(user.status)
      )
    );
    return users;
  }
}