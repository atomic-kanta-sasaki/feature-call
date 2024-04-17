import { User } from "../../domain/models/users/User";
import { Email } from "../../domain/models/users/ValueObject/Email";

export class UserDTO {
  public readonly id: string;
  public readonly email: Email;

  constructor(user: User) {
    this.id = user.Id.value;
    this.email = user.Email;
  }
}

export class UsersDTO {
  public readonly users: UserDTO[];

  constructor(users: User[]) {
    this.users = users.map(user => new UserDTO(user));
  }
}
