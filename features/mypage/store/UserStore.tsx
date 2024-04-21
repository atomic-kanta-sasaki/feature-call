import axios, { AxiosResponse } from 'axios';

type User = {
  name: string
}

export class UserStore {
  getUser = async () => {
    const url = `/api/mypage`
    const response: AxiosResponse<User> = await axios.get(url);
    return response.data;
  }
}