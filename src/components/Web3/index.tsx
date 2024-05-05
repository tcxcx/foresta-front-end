"use client";

import { useCallback, useEffect, useState } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { ConnectWallet } from "./ConnectWallet";
import { SignIn } from "./SignIn";
import { Profile } from "./AdminProfile";
import { GridPattern } from "@/components/ui/GridPattern";
import { useAuth } from "@/hooks/context/account";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface WalletProps {
  onGoBack: () => void;
}

export const Wallet: React.FC<WalletProps> = ({ onGoBack }) => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[] | undefined>();
  const { account, jwtToken, login, logout } = useAuth();

  const gridBlocks = [
    [2, 5],
    [3, 1],
    [4, 3],
  ];

  const handleSignedIn = (selectedAccount: InjectedAccountWithMeta, jwt: string) => {
    login(selectedAccount, jwt);
  };

  const handleSignOut = useCallback(() => {
    logout();
  }, [logout]);

  const subscribeToExtensions = useCallback(async () => {
    if (accounts === undefined) return;
    const { web3AccountsSubscribe } = await import("@polkadot/extension-dapp");
    web3AccountsSubscribe((newAccounts) => {
      const newAddresses = newAccounts.map(account => account.address).join("");
      const oldAddresses = accounts.map(account => account.address).join("");
      if (newAddresses !== oldAddresses) {
        setAccounts(newAccounts);
      }
    });
  }, [accounts]);

  useEffect(() => {
    subscribeToExtensions();
  }, [subscribeToExtensions]);

  useEffect(() => {
    if (account?.address && accounts && !accounts.some(acc => acc.address === account.address)) {
      handleSignOut();
    }
  }, [accounts, account, handleSignOut]);

  return (
    <div className="w-full bg-zinc-900/10">
      <div className="dark:border-stone-800/40 border-stone-600/40 overflow-hidden relative bg-gradient-to-r from-green-300/20 via-cyan-200/20 to-indigo-600/20 dark:bg-gradient-to-r dark:from-stone-800/5 dark:via-stone-800/5 dark:to-stone-800/20 hover:border-primary/40 dark:hover:border-stone-800/90 border p-4 rounded-xl w-full min-h-[384px] sm:h-full flex flex-col flex-1 transition-colors duration-300 ease-in-out delay-50">
        <GridPattern
          size={75}
          offsetX={0}
          offsetY={0}
          className="absolute -top-1/4 right-1 h-[200%] w-2/3 skew-y-12 dark:stroke-white/10 stroke-indigo-600/20 stroke-[2] [mask-image:linear-gradient(-85deg,black,transparent)]"
        >
          {gridBlocks.map(([row, column], index) => (
            <GridPattern.Block
              key={index}
              row={row}
              column={column}
              className="dark:fill-white/2.5 fill-indigo-600/2.5 transition duration-800 hover:fill-primary"
            />
          ))}
        </GridPattern>
        <div className="mb-4">
          <Button
            onClick={onGoBack}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute z-10 uppercase bg-transparent dark:text-white text-black"
            )}
          >
            <ArrowLeft className="h-3 w-3 mr-2" />
            Back
          </Button>
        </div>
        {account && jwtToken ? (
          <Profile
            account={account as InjectedAccountWithMeta}
            jwtToken={jwtToken}
            onSignOut={handleSignOut}
          />
        ) : accounts ? (
          <SignIn
            accounts={accounts}
            onCancel={() => setAccounts(undefined)}
            onSignedIn={handleSignedIn}
          />
        ) : (
          <ConnectWallet onAccounts={setAccounts} />
        )}
      </div>
    </div>
  );
};
