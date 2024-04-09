import bcrypt from 'bcrypt';
import { ValueObject } from '../../shared/ValueObject';
import { CustomError } from '../../../../shared/CustomError';
import { StatusCodeEnum } from '../../../../shared/StatusCode';

type Password = string;

export class PasswordHash extends ValueObject<Password, 'Password'> {
  static readonly MIN_LENGTH = 8;

  constructor(value: Password) {
    super(value);
  }

  protected validate(value: Password): void {
    if (value.length < PasswordHash.MIN_LENGTH) {
      throw new CustomError(
        `Passwordは${PasswordHash.MIN_LENGTH}文字以上でなければなりません。`, StatusCodeEnum.BAD_REQUEST
      );
    }
  }

  async hashPassword(): Promise<string> {
    const hashedPassword = await bcrypt.hash(this.value, 10);
    return hashedPassword;
  }
}