'use client';
import axios from 'axios';

type Props = {
  email: string,
  password: string
}

export class AuthStore {
  login = async ({ email, password }: Props) => {
    const url = "http://localhost:3000/api/auth/login";
    const payload = {
      email: email,
      password: password
    };
    const response = await axios.post(url, payload);
  }

  signUp = async ({ email, password }: Props) => {
    const url = "http://localhost:3000/api/auth/signup";
    const payload = {
      email: email,
      password: password
    };
    const response = await axios.post(url, payload);
  }
}