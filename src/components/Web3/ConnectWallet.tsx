// ConnectWallet.tsx
"use client";

import React, { useState } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import Image from "next/image";
import useInjectedWeb3 from "@/components/Web3/useInjectedWeb3";
import { Wallets } from "@/components/Web3/WalletList";
import { ButtonRight } from "../ui/ButtonRight";
import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";

type Props = {
  onAccounts: (accounts: InjectedAccountWithMeta[]) => void;
};

export const ConnectWallet: React.FC<Props> = ({ onAccounts }) => {
  const [connecting, setConnecting] = useState(false);
  const { injectedWeb3 } = useInjectedWeb3();

  const walletOptions = Wallets.map((wallet) => ({
    ...wallet,
    available: !!injectedWeb3?.[wallet.extensionName],
  }));

  const handleConnectWallet = async (walletExtensionName: string) => {
    setConnecting(true);
    try {
      const { web3Enable, web3Accounts } = await import(
        "@polkadot/extension-dapp"
      );
      await web3Enable("Sign-In with your Substrate Account");
      const accounts = await web3Accounts();
      onAccounts(accounts);
    } catch (e) {
      console.error(e);
    } finally {
      setConnecting(false);
    }
  };


  return (
    <>
      <div className="grid grid-cols-1 gap-4 items-center justify-items-center sm:gap-4 sm:p-4">
        <p className="dark:text-white text-lg font-clash uppercase animate-pulse">
          Sign in here
        </p>
        <p className="text-sm text-gray-600 mb-2 text-center text-violet">
          Connect your Substrate-based wallet to continue.
        </p>
        {walletOptions.map((wallet, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center justify-center w-full">
            {wallet.available ? (
              <>
                <Image
                  src={wallet.logoSrc}
                  alt={wallet.title}
                  width={50}
                  height={50}
                />
                <ButtonRight
                  onClick={() => handleConnectWallet(wallet.extensionName)}
                  text={`Connect  ${wallet.title}`}
                  disabled={connecting}
                  stateText={connecting ? "Connecting..." : ""}
                />
              </>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center w-full">
              <div className="flex flex-col items-center">
                  <Link
                    href={wallet.installUrl}
                    passHref
                    className="cursor-pointer mb-2"
                  >
                    <Image
                      src={wallet.logoSrc}
                      alt={wallet.title}
                      width={40}
                      height={40}
                    />
                  </Link>
                  
                  <Link
                    href={wallet.installUrl}
                    className={badgeVariants({ variant: "outline" })}
                  >
                    Install
                  </Link>
                </div>
                <ButtonRight
                  onClick={() => {}}
                  text={wallet.title}
                  disabled={true}
                  stateText={"Wallet Not Available"}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    
    </>
  );
};
