import { setJwtToken } from "../../shared/JwtVerify"
import { IUserRepository } from "../../interface/users/IUserRepository";
import { UserComparePassword } from "../../domain/service/users/UserComparePassword"

export type UserLoginRequest = {
  email: string;
  password: string;
}

export class LoginUser {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async call(request: UserLoginRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new Error('メールアドレスのユーザーは存在しません')
    }
    const isAuth = await new UserComparePassword(this.userRepository).execute(request.email, request.password);
    if (!isAuth) {
      throw new Error("パスワードが不正です");
    }
    setJwtToken(user.Id.value)
  }
}