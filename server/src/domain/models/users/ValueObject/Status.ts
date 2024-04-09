import { ValueObject } from '../../shared/ValueObject';
import { CustomError } from '../../../../shared/CustomError';
import { StatusCodeEnum } from '../../../../shared/StatusCode';

export enum StatusEnum {
  Active = 'Active',
  DisActive = 'DisActive',
}
export type StatusLabel = '有効なユーザー' | '削除済みユーザー';

type StatusValue = StatusEnum;
export class Status extends ValueObject<StatusValue, 'Status'> {
  constructor(value: StatusValue = StatusEnum.Active) {
    super(value);
  }

  protected validate(value: StatusValue): void {
    if (!Object.values(StatusEnum).includes(value)) {
      throw new CustomError('無効なステータスです。', StatusCodeEnum.BAD_REQUEST);
    }
  }

  toLabel(): StatusLabel {
    switch (this._value) {
      case StatusEnum.Active:
        return '有効なユーザー';
      case StatusEnum.DisActive:
        return '削除済みユーザー';
    }
  }
}

