'use client';
import { useMemo, useCallback } from 'react';
import { AuthStore } from '../store/AuthStore';

type Props = {
  email: string,
  password: string
}

export type AuthApiActions = {
  postLogin: (email: string, password: string) => Promise<void>;
  postSignUp: (email: string, password: string) => Promise<void>;
}

export const useAuthApi = (): AuthApiActions => {
  const authStore = useMemo(() => new AuthStore(), []);

  const postLogin = async (email: string, password: string) => {
    await authStore.login({ email, password });
  };

  const postSignUp = async (email: string, password: string) => {
    await authStore.signUp({ email, password });
  };

  return {
    postLogin,
    postSignUp
  };
};