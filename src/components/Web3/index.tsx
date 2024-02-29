"use client";

import { useCallback, useEffect, useState } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { ConnectWallet } from "./ConnectWallet";
import { SignIn } from "./SignIn";
import { Profile } from "./Profile";
import { GridPattern } from "@/components/ui/GridPattern";
import useWalletStore from "@/hooks/context/useWalletStore";

export const Wallet = () => {
  const [signedInWith, setSignedInWith] = useState<
    InjectedAccountWithMeta | undefined
  >();
  const [accounts, setAccounts] = useState<
    InjectedAccountWithMeta[] | undefined
  >();
  const [jwtToken, setJwtToken] = useState<string | undefined>();

  const gridBlocks = [
    [2, 5],
    [3, 1],
    [4, 3],
  ];
  const handleSignedIn = (
    selectedAccount: InjectedAccountWithMeta,
    jwtToken: string
  ) => {
    setJwtToken(jwtToken);
    setSignedInWith(selectedAccount);
    useWalletStore.getState().setWallet(selectedAccount.address, jwtToken);
  };

  const handleSignOut = useCallback(() => {
    setSignedInWith(undefined);
    setJwtToken(undefined);
    useWalletStore.getState().clearWallet();
  }, []);

  // subscribe to extension changes after first connect
  const subscribeToExtensions = useCallback(async () => {
    if (accounts === undefined) return;
    const { web3AccountsSubscribe } = await import("@polkadot/extension-dapp");

    web3AccountsSubscribe((newAccounts) => {
      // dont update if newAccounts is same as accounts
      const newAddresses = newAccounts
        .map((account) => account.address)
        .join("");
      const oldAddresses = accounts.map((account) => account.address).join("");
      if (newAddresses === oldAddresses) return;

      // update accounts list
      setAccounts(newAccounts);
    });
  }, [accounts]);

  useEffect(() => {
    subscribeToExtensions();
  }, [subscribeToExtensions]);

  // auto sign out disconnected extensions
  useEffect(() => {
    if (
      signedInWith?.address &&
      accounts &&
      !accounts.find((account) => account.address === signedInWith?.address)
    )
      handleSignOut();
  }, [accounts, handleSignOut, signedInWith?.address]);


  return (
    <div className="w-full bg-zinc-900/10">
      <div className="border-stone-800/40 overflow-hidden relative bg-gradient-to-r from-green-300/20 via-cyan-200/20 to-indigo-600/20 dark:bg-gradient-to-r dark:from-stone-800/5 dark:via-stone-800/5  dark:to-stone-800/20  hover:border-primary/40 dark:hover:border-stone-800/90  border p-4 rounded-xl w-full min-h-[384px] sm:h-96 flex flex-col flex-1 transition-colors duration-300 ease-in-out delay-50">

              {/* <div className="w-full border-4 dark:border-2 bg-gradient-to-r from-green-300/20 via-cyan-200/20 to-indigo-600/20 dark:from-transparent dark:via-cyan-200/20 dark:to-indigo-600/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 dark:border-secondary border-primary/30"> */}

        <GridPattern
          size={64}
          offsetX={0}
          offsetY={0}
          className="absolute -top-1/2 right-0 h-[200%] w-2/3 skew-y-12 stroke-white/10 stroke-[2] [mask-image:linear-gradient(-85deg,black,transparent)]"
        >
          {gridBlocks.map(([row, column], index) => (
            <GridPattern.Block
              key={index}
              row={row}
              column={column}
              className="fill-white/2.5 transition duration-500 hover:fill-primary"
            />
          ))}
        </GridPattern>
        {signedInWith && !!jwtToken ? (
          <Profile
            account={signedInWith}
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
          <>
            <ConnectWallet onAccounts={setAccounts} />
            
          </>
        )}
      </div>
    </div>
  );
};
