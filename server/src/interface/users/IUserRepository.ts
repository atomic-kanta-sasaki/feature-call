import { UserId } from "../../domain/models/users/ValueObject/Id";
import { User } from "../../domain/models/users/User";

export interface IUserRepository {
  save(book: User): Promise<void>;
  update(book: User): Promise<void>;
  delete(user: User): Promise<void>;
  find(bookId: UserId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[] | null>;
}
