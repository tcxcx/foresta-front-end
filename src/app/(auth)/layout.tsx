import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Foresta | Log In",
  description: "Log into the platform with blockchain based Substrate signatures",
}

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <>
        <section>
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
            {children}
          </div>
        </section>
    </>
  )
}