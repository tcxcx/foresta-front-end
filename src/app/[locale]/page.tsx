import React from "react";
import { WavyBackgroundDemo } from "@/components/home/wavy-background";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-full w-full px-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </div>
      <main className="m-4 sm:m-8 lg:m-10">
        <WavyBackgroundDemo />
      </main>
      <Footer />
    </>
  );
}
