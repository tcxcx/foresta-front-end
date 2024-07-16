// import { useState, useEffect } from 'react';
// import { fetchTotalAvailableCredits } from '@/hooks/web3/queries';

// export const useFetchTotalAvailableCredits = () => {
//   const [totalAvailableCredits, setTotalAvailableCredits] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const getTotalCredits = async () => {
//       try {
//         setLoading(true);
//         const totalCredits = await fetchTotalAvailableCredits();
//         setTotalAvailableCredits(totalCredits);
//       } catch (err) {
//         console.error('Failed to fetch total available credits:', err);
//         setError(err instanceof Error ? err : new Error(String(err)));
//       } finally {
//         setLoading(false);
//       }
//     };

//     getTotalCredits();
//   }, []);

//   return { totalAvailableCredits, loading, error };
// };
