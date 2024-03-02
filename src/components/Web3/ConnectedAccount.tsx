import * as React from "react";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Trees } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";


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
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <TooltipProvider>
                <div className="flex items-center gap-4 m-4">
                  {/* Title of menu bar */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleCopyToClipboard} variant="ghost">
                        <div className="flex items-center gap-2">
                          <Identicon
                            value={account.address}
                            size={32}
                            theme="polkadot"
                          />
                          <Separator orientation="vertical" />
                          <div>
                            <div className="text-white font-bold">
                              {account.meta.name}
                            </div>
                            <div className="text-stone-400 text-xs">
                              {truncateMiddle(account.address, 5, 5, "...")}
                            </div>
                          </div>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {" "}
                      <div className="inline-flex font-clash">
                        <CopyIcon /> <span className="invisible"> s</span>Copy
                        Address
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>

              {/* Menu hover below section */}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-xl p-6 no-underline outline-none focus:shadow-md"
                      style={{
                        backgroundImage: "url(/images/forest-cover.webp)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      href="/"
                      
                    >

                      {/* Description */}
                      <div className="text-base text-green-300 inline-flex font-medium font-clash">
                        Total CO2 Retired
                      </div>
                      {/* Icon and Number */}
                      <div className="flex items-center mb-2 mt-4 leading-tight t">
                        <Trees className="h-12 w-12 mr-2" />
                        <span className="text-4xl font-medium font-clash text-green-300">
                          32
                        </span>
                        <span className="ml-1 font-clash text-sm">mTon</span>
                      </div>
                      <p className="mt-2 text-sm leading-tight text-left text-white text-muted-foreground">
                        <a className="underline decoration-indigo-500 font-clash ">
                          Thank you
                        </a>
                        <br />
                        for your climate action while supporting <br />
                        <a className="underline decoration-double	 decoration-green-300 font-clash  ">
                          local conservation
                        </a>
                        <br />
                        communities.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Switch Address">
                  Select a different account to use Foresta.
                </ListItem>
                <ListItem href="/docs/installation" title="CO2 Calculator">
                  Calculate your CO2 emissions.
                </ListItem>
                <ListItem
                  href="/docs/primitives/typography"
                  title="Retired CO2 Certificates"
                >
                  Check your Retired CO2 NFTs and share them with the
                  world.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <TooltipProvider>
        <div className="flex items-center gap-4 m-4">
          {/* Title of menu bar */}
          <Tooltip>
            <TooltipContent side="bottom">
              {" "}
              <div className="inline-flex font-clash">
                <CopyIcon /> <span className="invisible"> s</span>Copy Address
              </div>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleLogout} variant="outline">
                <ExitIcon className="text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="font-clash">
              Sign Out
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
