import { ValueObject } from '../../shared/ValueObject';

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
      throw new Error('無効なステータスです。');
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

