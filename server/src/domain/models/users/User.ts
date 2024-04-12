import { UserId } from '../users/ValueObject/Id'
import { Email } from '../users/ValueObject/Email'
import { Status, StatusEnum } from '../users/ValueObject/Status'

export class User {
  private constructor(
    private readonly id: UserId,
    private email: Email,
    private password: string,
    private status: Status
  ) { }

  static create(
    email: string,
    password: string,
  ) {

    return new User(new UserId(), new Email(email), password, new Status())
  }

  public changeEmail(email: Email) {
    this.email = email
  }

  public changePassword(password: string) {
    this.password = password
  }

  static reconstruct(
    id: UserId,
    email: Email,
    password: string,
    status: Status
  ) {
    return new User(id, email, password, status)
  }

  get Id(): UserId {
    return this.id
  }

  get Email(): Email {
    return this.email
  }

  get Password(): string {
    return this.password
  }

  get Status(): Status {
    return this.status
  }

  public delete() {
    this.status = new Status(StatusEnum.DisActive)
  }
}