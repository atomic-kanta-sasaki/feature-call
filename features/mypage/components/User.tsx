'use client'
import { useEffect, useState } from 'react';
import { useUserAction } from '../hooks/useUserApi'

type User = {
  name: string
}
export const User = () => {
  const { getUser } = useUserAction();
  const [user, setUser] = useState<User>({ name: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <div>my page {user.name}</div>
    </div>
  );
};
