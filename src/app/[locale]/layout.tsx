import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import TanstackProvider from "@/lib/TanstackProvider";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { AuthProvider } from "@/hooks/context/account";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Foresta | Home",
  description:
    "A carbon credit protocol based on the principles of community-based natural resource management for Conservation of Forests.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            <AuthProvider>
              <div className="flex mx-auto dark:bg-background">
                <div className="flex-grow font-violet">{children}</div>
              </div>
            </AuthProvider>
            <Toaster />
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
