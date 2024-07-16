'use client';

import { Wallet } from "@/components/Web3/index";
import { useRouter } from "next/navigation";

export default function AuthenticationPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center p-4">
        <Wallet onGoBack={handleGoBack} />
      </main>
    </>
  );
}