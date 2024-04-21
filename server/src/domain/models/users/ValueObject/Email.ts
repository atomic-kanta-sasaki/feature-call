import { CustomError } from "@/server/src/shared/CustomError";
import { StatusCodeEnum } from "@/server/src/shared/StatusCode";
import { ValueObject } from "../../shared/ValueObject";

type EmailType = string;
export class Email extends ValueObject<EmailType, 'Email'> {
  constructor(value: EmailType) {
    super(value);
  }

  protected validate(value: EmailType): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new CustomError(
        `メールアドレスの形式が正しくありません`, StatusCodeEnum.BAD_REQUEST
      );
    }
  }
}
