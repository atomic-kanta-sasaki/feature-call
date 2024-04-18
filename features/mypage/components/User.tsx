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
      const fetchedUser = await getUser('AOl9Qwx-yXMCkR-Pzbb_k');
      setUser(fetchedUser);
    };

    fetchUser();
  }, []);
  console.log('user');
  console.log(user.data.name);
  console.log('user');

  return (
    <div>
      <div>my page {user.name}</div>
    </div>
  );
};
