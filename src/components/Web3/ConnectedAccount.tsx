import React from "react";
import { CopyIcon, ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/hooks/context/account";
import truncateMiddle from "truncate-middle";
import Identicon from "@polkadot/react-identicon";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ConnectedAccount() {
  const { account, logout } = useAuth();
  const { toast } = useToast();

  if (!account) {
    return <div>No account connected</div>;
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(account.address);
    toast({
      title: "Address Copied",
      description: "The account address has been copied to your clipboard.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <div onClick={handleCopyToClipboard} className="cursor-pointer flex items-center gap-2">
          <Identicon value={account.address} size={32} theme="polkadot" />
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <div className="text-white font-bold">{account.meta.name}</div>
                <div className="text-stone-400 text-xs">
                  {truncateMiddle(account.address, 5, 5, "...")}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <div className="flex items-center">
                <CopyIcon className="mr-2" />
                Copy Address
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={handleLogout} className="ml-auto">
              <ExitIcon className="text-white" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div>Sign Out</div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
