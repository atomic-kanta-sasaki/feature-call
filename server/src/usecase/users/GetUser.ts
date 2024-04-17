import { injectable, inject } from 'tsyringe';
import { UserDTO } from "../../application/users/UserDTO";
import { UserId } from "../../domain/models/users/ValueObject/Id";
import { IUserRepository } from "../../interface/users/IUserRepository";
import { CustomError } from '../../shared/CustomError';
import { StatusCodeEnum } from '../../shared/StatusCode';

@injectable()
export class GetUser {
  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository
  ) { }

  async call(id: string) {
    const user = await this.userRepository.find(new UserId(id))

    if (!user) {
      throw new CustomError("ユーザー情報が取得できませんでした。", StatusCodeEnum.BAD_REQUEST);
    }
    return new UserDTO(user)
  }
}
