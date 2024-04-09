import bcrypt from 'bcrypt';
import { IUserRepository } from '@/server/src/interface/users/IUserRepository';

export class UserComparePassword {
  constructor(
    private userRepository: IUserRepository
  ) { }
  async execute(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false
    }

    const isAuth = await this.comparePasswords(password, user.Password)
    return isAuth;
  }

  private async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}