import { IUserRepository } from '@/server/src/interface/users/IUserRepository';

export class UserDuplicationCheckDomainService {
  constructor(
    private userRepository: IUserRepository
  ) { }
  async execute(email: string): Promise<boolean> {
    const duplicateUsers = await this.userRepository.findByEmail(email);
    const isDuplicateId = !!duplicateUsers

    return isDuplicateId;
  }
}