import axios from 'axios';

type Props = {
  id: string
}

type User = {
  name: string
}

export class UserStore {
  getUser = async ({ id }: Props) => {
    const url = `http://localhost:3000/api/mypage/${id}`
    const response: User = await axios.get(url);
    return response;
  }
}