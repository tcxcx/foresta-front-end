import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import LocalSwitcher from "./local-switcher";
import { ModeToggle } from "./theme-toggle";
import AuthButton from "./auth/AuthButton";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";

export default function Header() {
  const t = useTranslations("Navigation");

  return (
    <header className="relative p-4 z-10 bg-white dark:bg-background">
      <nav className="flex items-center justify-between">
        <div className="flex-1 flex items-center justify-start space-x-2 lg:space-x-4">
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <AlignJustify />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full bg-white shadow-xl rounded-md">
                <DropdownMenuItem asChild>
                  <LocalSwitcher />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <ModeToggle />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Always visible on large screens */}
          <div className="hidden lg:flex items-center space-x-4">
            <LocalSwitcher />
            <ModeToggle />
          </div>
        </div>
        <div className="mx-auto lg:mx-0">
          <Link href="/" passHref>
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo-icon-2.png"
                alt="Foresta Logo"
                width={40} // Smaller logo size for mobile
                height={40} // Matching height to width
                objectFit="contain"
                className="block w-10 h-10 lg:w-12 lg:h-12" // Larger on larger screens
              />
              <span className="hidden lg:block font-clash text-3xl lg:text-5xl uppercase hover:text-green-500 cursor-pointer dark:text-white">
                Foresta
              </span>
            </div>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-end space-x-2 lg:space-x-4">
          <AuthButton />
        </div>
      </nav>
      <div
        className="absolute bg-white dark:bg-background top-full left-0 m-[-0.8rem] w-full overflow-hidden"
        style={{ height: "100px" }}
      >
        {/* Gradients and lines */}
        <div className="relative h-full">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </header>
  );
}
