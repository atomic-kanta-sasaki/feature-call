import { UsersDTO } from "../../application/users/UserDTO";
import { IUserRepository } from "../../interface/users/IUserRepository";

export class GetUsers {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async call() {
    const users = await this.userRepository.findAll()
    return users ? new UsersDTO(users) : null
  }
}