import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/context/account";

export const useSignOut = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const signOut = () => {
    logout();
    router.push("/");
  };

  return signOut;
};
