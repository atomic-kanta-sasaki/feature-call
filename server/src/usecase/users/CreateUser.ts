import { ITransactionManager } from "../../application/shared/ITransactionManager";
import { User } from "../../domain/models/users/User";
import { PasswordHash } from "../../domain/models/users/ValueObject/Password";
import { UserDuplicationCheckDomainService } from "../../domain/service/users/UserDuplicationCheckDomainService";
import { IUserRepository } from "../../interface/users/IUserRepository";

export type UserCreateRequest = {
  email: string;
  password: string;
}

export class CreateUser {
  constructor(
    private userRepository: IUserRepository,
    private transactionManager: ITransactionManager
  ) { }

  async call(request: UserCreateRequest): Promise<void> {
    await this.transactionManager.begin(async () => {
      const isDuplicateId = await new UserDuplicationCheckDomainService(this.userRepository).execute(request.email)

      if (isDuplicateId) {
        throw new Error("すでに登録されています。");
      }
      const hashedPassword = await new PasswordHash(request.password).hashPassword();

      const user = User.create(
        request.email,
        hashedPassword
      )

      await this.userRepository.save(user)
    })
  }
}