import { ITransactionManager } from "../../application/shared/ITransactionManager";
import { User } from "../../domain/models/users/User";
import { PasswordHash } from "../../domain/models/users/ValueObject/Password";
import { UserDuplicationCheckDomainService } from "../../domain/service/users/UserDuplicationCheckDomainService";
import { IUserRepository } from "../../interface/users/IUserRepository";
import { CustomError } from "../../shared/CustomError";
import { StatusCodeEnum } from "../../shared/StatusCode";

export type UserCreateRequest = {
  name: string;
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
        throw new CustomError("メールアドレスはすでに使用されています", StatusCodeEnum.BAD_REQUEST);
      }
      const hashedPassword = await new PasswordHash(request.password).hashPassword();

      const user = User.create(
        request.email,
        hashedPassword,
        request.name,
      )

      await this.userRepository.save(user)
    })
  }
}