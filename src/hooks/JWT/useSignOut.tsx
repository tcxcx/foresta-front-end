import { useRouter } from "next/navigation";
import useWalletStore from "@/hooks/context/useWalletStore";

export const useSignOut = () => {
  const { clearWallet } = useWalletStore();
  const router = useRouter();

  const signOut = () => {
    clearWallet();
    router.push("/");
  };

  return signOut;
};
