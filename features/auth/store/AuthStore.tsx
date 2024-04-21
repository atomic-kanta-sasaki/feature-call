'use client';
import axios from 'axios';

type LoginProps = {
  email: string,
  password: string
}

type SignUpProps = {
  name: string,
  email: string,
  password: string
}

export class AuthStore {
  login = async ({ email, password }: LoginProps) => {
    const url = `/api/auth/login`;
    const payload = {
      email: email,
      password: password
    };
    await axios.post(url, payload);
  }

  signUp = async ({ name, email, password }: SignUpProps) => {
    const url = `/api/auth/signup`;
    const payload = {
      name: name,
      email: email,
      password: password
    };
    await axios.post(url, payload);
  }
}