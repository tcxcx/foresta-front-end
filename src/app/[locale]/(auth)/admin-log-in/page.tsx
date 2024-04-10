import Image from "next/image";
import Link from "next/link";
import { Wallet } from "@/components/Web3/index";

export default function AuthenticationPage() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center p-4">
        <Wallet />
      </main>
    </>
  );
}
