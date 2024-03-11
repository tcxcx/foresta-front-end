import { useState, useEffect } from "react";
import { fetchDEXBuyOrderCount, fetchDEXOrders, fetchDEXBuyOrdersByUser } from "@/hooks/web3/queries";

interface DEXDetails {
    orderCount: number;
    orders: any[];
    userOrders: any[]; 
  }  

export const useFetchDEXDetails = (userAccountId: string) => {
    const [dexDetails, setDEXDetails] = useState<DEXDetails | null>(null);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const orderCountResponse = await fetchDEXBuyOrderCount();
        const ordersResponse = await fetchDEXOrders();
        const userOrdersResponse = await fetchDEXBuyOrdersByUser(userAccountId);
        
        const orderCount = Number(orderCountResponse);
        const orders = Array.isArray(ordersResponse) ? ordersResponse : [];
        const userOrders = Array.isArray(userOrdersResponse) ? userOrdersResponse : [];
      
        setDEXDetails({ orderCount, orders, userOrders });
      } catch (e: any) {
        console.error("Error fetching DEX details:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [userAccountId]);

  return { dexDetails, loading, error };
};