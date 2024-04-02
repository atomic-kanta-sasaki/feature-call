'use client';
import { useState, ChangeEvent, FormEvent } from 'react';

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

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password)
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
