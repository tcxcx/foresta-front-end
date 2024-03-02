import { WavyBackgroundDemo } from "@/components/home/wavy-background";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-full w-full px-4">
          <Header />
        </div>
      </div>
      <div className="m-10">
        <WavyBackgroundDemo />
      </div>
      <Footer />
    </>
  );
}
