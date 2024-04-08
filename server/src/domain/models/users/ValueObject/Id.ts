import { ValueObject } from '../../shared/ValueObject';
import { nanoid } from 'nanoid';

type Id = string;
export class UserId extends ValueObject<Id, 'Id'> {
  static readonly MAX_LENGTH = 100;
  static readonly MIN_LENGTH = 1;

  constructor(value: Id = nanoid()) { // デフォルトではnanoidを利用しID生成
    super(value);
  }

  protected validate(value: Id): void {
    if (
      value.length < UserId.MIN_LENGTH ||
      value.length > UserId.MAX_LENGTH
    ) {
      throw new Error(
        `Idは${UserId.MIN_LENGTH}文字以上、${UserId.MAX_LENGTH}文字以下でなければなりません。`
      );
    }
  }
}
