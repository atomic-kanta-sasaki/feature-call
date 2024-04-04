'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useAuthApi } from '../hooks/useAuthApi';

export type LoginFormState = {
  email: string;
  password: string;

};

export type LoginFormActions = {
  handleChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}

export const useLoginForm = (): [LoginFormState, LoginFormActions] => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { postLogin } = useAuthApi();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await postLogin(email, password)
  }

  return [
    {
      email,
      password,
    },
    {
      handleChangeEmail,
      handleChangePassword,
      handleSubmit
    }
  ]
}
