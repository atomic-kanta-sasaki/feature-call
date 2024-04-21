import { getLoginUser } from "../../shared/GetLoginUserId";

export class GetCurrentUser {
  constructor() { }
  async call() {
    const userId = await getLoginUser()
    return userId
  }
}