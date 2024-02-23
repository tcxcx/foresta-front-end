import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from "axios";
import { ApiError } from 'next/dist/server/api-utils';

// Generic type for the hook
type FetchParams<T> = {
  queryKey: string[];
  url: string;
  transformResponse?: (data: any) => T; // Optional transformation function
  enabled?: boolean; // Optional flag to enable/disable the query
};

// The hook itself, using a generic type T
export const useFetch = <T,>(params: FetchParams<T>): UseQueryResult<T, Error> => {
  const { queryKey, url, transformResponse = (data) => data, enabled = true } = params;

  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get(url);
      return transformResponse(data);
    },
    enabled,
  });
};

// example function to fetch a list of airports from a hypothetical Api

// import { useFetch } from './useFetch.ts';


// type Airport = {
//     id: string;
//     name: string;
//     location: string;
//   };
  
//   const useFetchAirports = () => {
//     return useFetch<Airport[]>({
//       queryKey: ['Airports'],
//       url: 'http://localhost:5000/airports',
//     });
//   };
  