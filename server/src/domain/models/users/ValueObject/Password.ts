import bcrypt from 'bcrypt';
import { ValueObject } from '../../shared/ValueObject';

type Password = string;

export class PasswordHash extends ValueObject<Password, 'Password'> {
  static readonly MIN_LENGTH = 8;

  constructor(value: Password) {
    super(value);
  }

  protected validate(value: Password): void {
    if (value.length < PasswordHash.MIN_LENGTH) {
      throw new Error(
        `Passwordは${PasswordHash.MIN_LENGTH}文字以上でなければなりません。`
      );
    }
  }

  async hashPassword(): Promise<string> {
    const hashedPassword = await bcrypt.hash(this.value, 10);
    return hashedPassword;
  }
}