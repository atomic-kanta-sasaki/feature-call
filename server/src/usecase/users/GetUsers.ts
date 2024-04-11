import { injectable, inject } from 'tsyringe';
import { UsersDTO } from "../../application/users/UserDTO";
import { IUserRepository } from "../../interface/users/IUserRepository";

@injectable()
export class GetUsers {
  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository
  ) { }

  async call() {
    const users = await this.userRepository.findAll()
    return users ? new UsersDTO(users) : null
  }
}