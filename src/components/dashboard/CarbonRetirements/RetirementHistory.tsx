import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { SheetTrigger, SheetTitle, SheetDescription, SheetHeader, SheetClose, SheetFooter, SheetContent, Sheet } from "@/components/ui/sheet";
import Image from "next/image";

export default function History() {
  return (
    <>
      <div className="relative">
        <Image
          alt="Banner Image"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
          height={600}
          src="/placeholder.svg"
          style={{
            aspectRatio: "1920/600",
            objectFit: "cover",
          }}
          width={1920}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Your Impact on the Environment
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl">
              Explore your history of minted carbon credit NFTs and their
              positive impact on the planet.
            </p>
          </div>
        </div>
      </div>
      <section className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href="#">History</Link>
              </BreadcrumbItem>
            </Breadcrumb>
            <h2 className="text-3xl font-bold tracking-tight mt-4">
              Your Minted Carbon Credit NFTs
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Explore your history of minted carbon credit NFTs and their
              impact on the environment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Repeat this div for each NFT item */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative group">
                <Image
                  alt="NFT Image"
                  className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href="#">
                    <a className="text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium">
                      View Details
                    </a>
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Carbon Credit NFT #1
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Minted on: 2023-05-01
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Carbon Credits: 100
                </p>
                <div className="flex justify-end mt-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size="sm" variant="outline">
                        Share
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button className="w-full">Share on:</Button>
                        </SheetTrigger>
                        <SheetContent side="bottom">
                          <SheetHeader>
                            <SheetTitle>Share Options</SheetTitle>
                            <SheetDescription>
                              Choose where you want to share this NFT.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4">
                            <Button className="w-full" variant="outline">
                              <TwitterIcon className="mr-2 h-4 w-4" />
                              Share on Twitter
                            </Button>
                            <Button className="w-full" variant="outline">
                              <FacebookIcon className="mr-2 h-4 w-4" />
                              Share on Facebook
                            </Button>
                            <Button className="w-full" variant="outline">
                              <InstagramIcon className="mr-2 h-4 w-4" />
                              Share on Instagram
                            </Button>
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button type="submit">Cancel</Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
