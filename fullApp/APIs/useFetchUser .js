import { useState, useEffect } from 'react';
import { useUsersApi } from './UserApi';

export const useFetchUser = (username) => {
  const { getUserByUsername } = useUsersApi();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserByUsername(username);
        setUser(res);
        console.log(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  return { user, isLoading, error };
};
