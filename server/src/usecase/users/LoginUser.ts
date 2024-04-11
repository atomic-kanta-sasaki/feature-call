import { injectable, inject } from 'tsyringe';
import { setJwtToken } from "../../shared/JwtVerify"
import { IUserRepository } from "../../interface/users/IUserRepository";
import { UserComparePassword } from "../../domain/service/users/UserComparePassword"
import { CustomError } from "../../shared/CustomError";
import { StatusCodeEnum } from "../../shared/StatusCode";

export type UserLoginRequest = {
  email: string;
  password: string;
}

@injectable()
export class LoginUser {
  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository
  ) { }

  async call(request: UserLoginRequest): Promise<string> {
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new CustomError('メールアドレスのユーザーは存在しません', StatusCodeEnum.BAD_REQUEST)
    }
    const isAuth = await new UserComparePassword(this.userRepository).execute(request.email, request.password);
    if (!isAuth) {
      throw new CustomError("パスワードが不正です", StatusCodeEnum.BAD_REQUEST);
    }
    const token = setJwtToken(user.Id.value)
    return token
  }
}