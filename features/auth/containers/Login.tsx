'use client';

import { useLoginForm } from '../hooks/useLoginForm';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const [{ email, password }, { handleChangeEmail, handleChangePassword, handleSubmit }] = useLoginForm();

  return (
    <LoginForm
      email={email}
      password={password}
      onChangeEmail={handleChangeEmail}
      onChangePassword={handleChangePassword}
      onSubmit={handleSubmit}
    />
  )
}