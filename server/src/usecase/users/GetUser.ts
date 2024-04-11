import { injectable, inject } from 'tsyringe';
import { UserDTO } from "../../application/users/UserDTO";
import { UserId } from "../../domain/models/users/ValueObject/Id";
import { IUserRepository } from "../../interface/users/IUserRepository";

@injectable()
export class GetUser {
  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository
  ) { }

  async call(id: string) {
    const user = await this.userRepository.find(new UserId(id))
    return user ? new UserDTO(user) : null
  }
}