import { User } from "../../domain/models/users/User";
import { Email } from "../../domain/models/users/ValueObject/Email";

export class UserDTO {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;

  constructor(user: User) {
    this.id = user.Id.value;
    this.email = user.Email.value;
    this.name = user.Name
  }
}

export class UsersDTO {
  public readonly users: UserDTO[];

  constructor(users: User[]) {
    this.users = users.map(user => new UserDTO(user));
  }
}
