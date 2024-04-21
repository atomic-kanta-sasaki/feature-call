'use client';
import { useMemo } from 'react';
import { UserStore } from '../store/UserStore';

type User = {
  name: string
}

export type UserApiAction = {
  getUser: () => Promise<User>;
}

export const useUserAction = (): UserApiAction => {
  const userStore = useMemo(() => new UserStore(), [])
  const getUser = async () => {
    return await userStore.getUser();
  }

  return {
    getUser
  }
}