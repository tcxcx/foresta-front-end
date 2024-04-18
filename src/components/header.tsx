import { useTranslations } from "next-intl";
import { Link } from 'next-view-transitions'
import LocalSwitcher from "./local-switcher";
import { ModeToggle } from "./theme-toggle";
import { SparklesCore } from "@/components/ui/sparkles";
import AuthButton from "./auth/AuthButton";
import Image from "next/image";
export default function Header() {
  const t = useTranslations("Navigation");

  return (
    <header className="relative p-4 z-10">
      <nav className="flex items-center justify-between">
        <div className="flex-1 flex items-center justify-start space-x-4">
          {/* <Link href="/" passHref>
            <div className="font-violet uppercase hover:underline hover:text-green-500 cursor-pointer">
              {t("home")}
            </div>
          </Link> */}
          <LocalSwitcher />
          <ModeToggle />
        </div>
        <div className="text-center">
          <Link href="/" passHref>
            <div className="flex items-center my-4">
              <Image
                src="/images/logo-icon.webp"
                alt="Foresta Logo"
                width={50}
                height={50}
                objectFit="contain"
              />
              <div className="font-clash text-5xl uppercase hover:text-green-500 cursor-pointer dark:text-white">
                Foresta
              </div>
            </div>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-end space-x-4">
          <AuthButton />
          <div className="opacity-0">{t("home")}</div>{" "}
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

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={900}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
          <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </header>
  );
}
