import { useContext } from 'react';
import { AxiosContext } from '../Authsrc/src/contexts/AxiosContext';

export const useUsersApi = () => {
  const { authAxios } = useContext(AxiosContext);

  const listAllUsers = async () => {
    try {
      const res = await authAxios.get('/users');
      if (res.status === 401) {
        throw new Error("Not authorized, please sign in");
      }
      if (res.status !== 200) {
        throw new Error("Error fetching the users");
      }
      return res.data;
    } catch (error) {
      console.error("An error occurred while fetching users: ", error);
      return [];
    }
  };

  const getUserByUsername = async (username) => {
    try {
      const res = await authAxios.get(`/users/${username}`);
      if (res.status === 401) {
        throw new Error("Not authorized, please sign in");
      }
      if (res.status !== 200) {
        throw new Error("Error fetching the user");
      }
      return res.data;
    } catch (error) {
      console.error("An error occurred while fetching the user: ", error);
      return null;
    }
  };

  return {
    listAllUsers,
    getUserByUsername,
  };
};
