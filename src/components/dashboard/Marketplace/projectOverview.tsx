import { Button } from "@/components/ui/button";
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel";
import { CardContent, Card } from "@/components/ui/card";
import { BentoSection } from "@/components/dashboard/Marketplace/bento-section";
import { SDGIcons } from "@/components/dashboard/Marketplace/sdg-icons";
import { DocumentLinks } from "@/components/dashboard/Marketplace/document-links";
import { VideoLinks } from "@/components/dashboard/Marketplace/video-links";
import Image from "next/image";

export default function Component() {
  return (
    <div className="grid md:grid-cols-2 gap-6 xl:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 items-start">
        <h1 className="font-bold text-3xl">SolarAid: Empowering Communities with Clean Energy</h1>
        <div className="grid gap-4 text-sm leading-loose">
          <p>
            SolarAid is a pioneering carbon offset project that aims to brighten lives and empower communities by providing access to clean, sustainable energy. By focusing on off-grid regions in sub-Saharan Africa, SolarAids innovative solar solutions are replacing harmful and expensive kerosene lamps, enabling families to illuminate their homes, power essential devices, and create new opportunities for growth and prosperity.
          </p>
          <p>
            Through the carbon offset market, SolarAid generates verified carbon credits by reducing greenhouse gas emissions from kerosene lamps. These carbon credits are then sold to individuals and businesses looking to offset their carbon footprint, providing crucial funding for SolarAid ongoing work. By supporting SolarAid, you not only contribute to the fight against climate change but also help transform the lives of those most affected by energy poverty.
          </p>
          <p>
            SolarAids impact extends beyond environmental benefits. By providing clean, reliable lighting, the project enables children to study after dark, improving educational outcomes. Families also save money on kerosene, which can be redirected towards other essential needs like food, healthcare, and education. Moreover, SolarAid empowers local entrepreneurs, creating jobs and stimulating economic growth in the communities it serves.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="font-bold text-lg">Project Details</h3>
            <div className="grid gap-1 text-sm">
              <p>
                <span className="font-semibold">Location:</span> Sub-Saharan Africa
              </p>
              <p>
                <span className="font-semibold">Impact area:</span> Clean energy access, education, economic empowerment
              </p>
              <p>
                <span className="font-semibold">Partners:</span> Local communities, schools, micro-entrepreneurs
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Impact Metrics</h3>
            <div className="grid gap-1 text-sm">
              <p>
                <span className="font-semibold">Families reached:</span> 1.5 million
              </p>
              <p>
                <span className="font-semibold">Schools with solar:</span> 3,000
              </p>
              <p>
                <span className="font-semibold">Health clinics powered:</span> 200
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-lg">dMRV Reporting</h3>
          <p className="text-sm">
            SolarAid utilizes a cutting-edge digital Measurement, Reporting, and Verification (dMRV) platform to provide real-time data on the projects clean energy generation and its environmental impacts. This ensures transparency, accuracy, and credibility in impact assessment, giving supporters confidence in the projects outcomes and the integrity of the carbon credits generated.
          </p>
        </div>
        <BentoSection
          title="Technical Details"
          items={[
            { label: "Carbon Standard", value: "Gold Standard" },
            { label: "Methodology", value: "AMS-I.L." },
            { label: "Estimated Annual Emission Reductions", value: "50,000 tCO2e" },
            { label: "Crediting Period", value: "2021-2031" },
          ]}
        />
        <SDGIcons sdgs={[1, 4, 7, 8, 13]} />
        <div className="grid gap-2">
          <Button size="lg">Purchase carbon credits</Button>
        </div>
        <section className="space-y-4 px-4 py-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold">Community Success Stories</h2>
          <p className="text-base">
            Discover the heartfelt stories from various communities that have transformed their daily lives through access to clean energy. These narratives illustrate the profound impact each solar light has on education, health, and livelihoods.
          </p>
          <ul className="list-disc pl-5 text-base space-y-2">
            <li>Sams Study: A teenagers academic success lit by solar light.</li>
            <li>Marys Clinic: How solar power supports emergency healthcare.</li>
            <li>Johs Crafting: A tale of entrepreneurial spirit powered by clean energy.</li>
          </ul>
        </section>
        <section className="space-y-4 px-4 py-6 rounded-md shadow-md bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold">Supporting SolarAid</h2>
          <p className="text-base">
            You can play a pivotal role in expanding the reach and impact of SolarAids projects. Heres how you can help:
          </p>
          <div className="space-y-2 text-base">
            <p>
              🌿 <strong>Donate:</strong> Every contribution brings us one step closer to a brighter future.
            </p>
            <p>
              💡 <strong>Buy a Light:</strong> Purchase our solar lights for yourself or a loved one and support our movement.
            </p>
            <p>
              📢 <strong>Spread the Word:</strong> Share our mission and impact stories with your network.
            </p>
          </div>
          <Button className="bg-on-link default-md" size="lg">
            Join Our Newsletter
          </Button>
        </section>
        <div className="grid gap-4">
          <DocumentLinks
            title="Project Documents"
            documents={[
              { name: "Project Design Document", url: "ipfs://QmAbCdEfGhIjKlMnOpQrStUvWxYz" },
              { name: "Validation Report", url: "ipfs://QmAbCdEfGhIjKlMnOpQrStUvWxYz" },
              { name: "Monitoring Report", url: "ipfs://QmAbCdEfGhIjKlMnOpQrStUvWxYz" },
            ]}
          />
          <VideoLinks
            title="Project Videos"
            videos={[
              { name: "SolarAid: Lighting Up Lives", url: "ipfs://QmAbCdEfGhIjKlMnOpQrStUvWxYz" },
              { name: "Empowering Communities with Solar", url: "ipfs://QmAbCdEfGhIjKlMnOpQrStUvWxYz" },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <Card>
          <CardContent className="p-4">
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                <CarouselItem>
                <Image
                    alt="Project Image 1"
                    className="aspect-video object-cover rounded-md"
                    height={300}
                    src="/placeholder.svg"
                    width={450}
                  />
                </CarouselItem>
                <CarouselItem>
                <Image
                    alt="Project Image 2"
                    className="aspect-video object-cover rounded-md"
                    height={300}
                    src="/placeholder.svg"
                    width={450}
                  />
                </CarouselItem>
                <CarouselItem>
                <Image
                    alt="Project Image 3"
                    className="aspect-video object-cover rounded-md"
                    height={300}
                    src="/placeholder.svg"
                    width={450}
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <h2 className="font-bold text-xl mt-4">SolarAid: Empowering Communities with Clean Energy</h2>
            <p className="text-sm">
              SolarAid is on a mission to brighten lives and empower communities by providing access to clean, sustainable energy. With a focus on off-grid regions in sub-Saharan Africa, SolarAids innovative solar solutions are replacing harmful and expensive kerosene lamps, allowing families to illuminate their homes, power essential devices, and create new opportunities for growth and prosperity.
            </p>
          </CardContent>
        </Card>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Project Information</h3>
          <ul className="list-disc pl-4 space-y-1">
            <li>Project Owner: Foresta Collective</li>
            <li>Credits from: VER+ Standard, Added March 2024</li>
            <li>Related SDGs: Clean Energy, Quality Education, Economic Growth</li>
          </ul>
          <h3 className="font-semibold text-lg mt-4">Documents & Studies</h3>
        </div>
      </div>
    </div>
  );
}