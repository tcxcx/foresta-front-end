import { Metadata } from "next";
import SideMenu from "@/components/dashboard/SideMenu"; // Adjust the import path as needed

export const metadata: Metadata = {
  title: "Examples",
  description: "Check out some examples app built using the components.",
};

interface ExamplesLayoutProps {
  children: React.ReactNode;
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <>

      <div className="flex h-screen bg-gray-50">
      <SideMenu />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}
