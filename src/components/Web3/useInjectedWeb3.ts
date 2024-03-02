import { useEffect, useState } from "react";
import useIsMounted from "@/hooks/useIsMounted";

interface InjectedWeb3 {
  [key: string]: any;
}

export default function useInjectedWeb3() {
  const isMounted = useIsMounted();
  const [injectedWeb3, setInjectedWeb3] = useState<InjectedWeb3 | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const attemptInjection = () => {
      // Type assertion to ensure window has injectedWeb3 as InjectedWeb3 type
      const web3 = (window as any).injectedWeb3 as InjectedWeb3 | undefined;
      if (web3 && isMounted()) {
        setInjectedWeb3(web3);
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      if ((window as any).injectedWeb3) {
        attemptInjection();
      } else {
        // Attempt to inject after a timeout if not immediately available
        setTimeout(attemptInjection, 1000);
      }
    }
  }, [isMounted]);

  return { loading, injectedWeb3 };
}
