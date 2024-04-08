import { UsersDTO } from "../../application/users/UserDTO";
import { UserRepository } from "../../infrastructure/repository/users/UserRepository";

export class GetUsers {
  constructor(
    private userRepository: UserRepository
  ) { }

  async call() {
    const users = await this.userRepository.findAll()
    return users ? new UsersDTO(users) : null
  }
}