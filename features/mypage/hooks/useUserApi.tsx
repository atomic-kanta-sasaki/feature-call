'use client';
import { useMemo } from 'react';
import { UserStore } from '../store/UserStore';

type User = {
  name: string
}

export type UserApiAction = {
  getUser: (id: string) => Promise<User>;
}

export const useUserAction = (): UserApiAction => {
  const userStore = useMemo(() => new UserStore(), [])
  const getUser = async (id: string) => {
    return await userStore.getUser({ id });
  }

  return {
    getUser
  }
}