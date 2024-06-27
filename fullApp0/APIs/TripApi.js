import { useContext } from 'react';
import { AxiosContext } from '../Authsrc/src/contexts/AxiosContext';

export const useFlightsApi = () => {
  const { authAxios } = useContext(AxiosContext);

  const listAllTrips = async () => {
    try {
      const res = await authAxios.get('/trips');
      if (res.status === 401) {
        throw new Error("Not authorized, please sign in");
      }
      if (res.status !== 200) {
        throw new Error("Error fetching the trips");
      }
      console.log(res.data);
      
      return res.data;
    } catch (error) {
      console.error("An error occurred while fetching trips: ", error);
      return [];
    }
  };

  const getTrip = async (id) => {
    try {
      const res = await authAxios.get(`/trips/${id}`);
      if (res.status === 401) {
        throw new Error("Not authorized, please sign in");
      }
      if (res.status !== 200) {
        throw new Error("Error fetching the trips");
      }
      return res.data;
    } catch (error) {
      console.error("An error occurred while fetching trips: ", error);
      return null;
    }
  };
  const createTrip = async (tripData) => {
    try {
      const res = await authAxios.post('/trips', tripData);
      if (res.status === 401) {
        throw new Error("Not authorized, please sign in");
      }
      if (res.status !== 200) {
        throw new Error("Error creating the trip");
      }
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("An error occurred while creating the trip: ", error);
      return null;
    }
  };

  return {
    listAllTrips,
    getTrip,
    createTrip,
  };
};
