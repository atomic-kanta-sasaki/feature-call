'use client';
import axios from 'axios';

type Props = {
  email: string,
  password: string
}

export class AuthStore {
  login = async ({ email, password }: Props) => {
    const url = "http://localhost:3000/api/auth/login";
    const body = {
      email: email,
      passowrd: password
    };
    const response = await axios.post(url, body);
    console.log(response.data);
  }
}