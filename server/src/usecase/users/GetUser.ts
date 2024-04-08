import { UserDTO } from "../../application/users/UserDTO";
import { UserId } from "../../domain/models/users/ValueObject/Id";
import { UserRepository } from "../../infrastructure/repository/users/UserRepository";


export class GetUser {
  constructor(
    private userRepository: UserRepository
  ) { }

  async call(id: string) {
    const user = await this.userRepository.find(new UserId(id))
    return user ? new UserDTO(user) : null
  }
}