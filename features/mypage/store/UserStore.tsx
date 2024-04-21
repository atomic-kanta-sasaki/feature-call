import axios, { AxiosResponse } from 'axios';

type Props = {
  id: string
}

type User = {
  name: string
}

export class UserStore {
  getUser = async () => {
    const url = `http://localhost:3000/api/mypage`
    const response: AxiosResponse<User> = await axios.get(url);
    return response.data;
  }
}