"use client";
import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RetirementData } from "@/hooks/context/useRetirementStore";
import { decodeHexString } from "@/lib/hexDecode";
import Spinner from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import truncateMiddle from "truncate-middle";

export const RetirementDetails = ({
  retirement,
}: {
  retirement: RetirementData;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleGoBack = () => {
    router.back();
  };

  const firstRetirement = retirement.retireData[0] ?? null;

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!retirement.ipfsHash || retirement.ipfsHash[0] === "0x") {
        setImageUrl("/images/placeholder.svg");
        setLoading(false);
        return;
      }
      const decodedCid = decodeHexString(retirement.ipfsHash[0]);
      console.log("decoded CID", decodedCid);
      try {
        const response = await fetch(`/api/get-image-url?cid=${decodedCid}`);
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Error fetching image URL:", error);
        setImageUrl("/images/error-placeholder.svg");
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrl();
  }, [retirement.ipfsHash]);

  return (
    <section className="bg-gray-50 dark:bg-background py-4 flex h-full">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="pb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={handleGoBack}
                    className="hover:underline cursor-pointer"
                  >
                    Retirement History
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    Retirement CID:
                    <span className="font-semibold hover:underline hover:text-primary">
                      {truncateMiddle(
                        decodeHexString(retirement.ipfsHash[0]),
                        5,
                        5,
                        "..."
                      )}
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              </BreadcrumbList>
            </Breadcrumb>

            <h2 className="text-3xl font-clash tracking-tight mt-2">
              {firstRetirement
                ? decodeHexString(firstRetirement.name)
                : "No Data Available"}
            </h2>
            <p className="text-foreground dark:text-muted-foreground font-violet mt-2">
              Explore the details of your minted carbon credit NFT and its
              impact on the environment.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {loading ? (
              <div className="w-full animate-shimmer h-48 flex items-center justify-center">
                <Spinner text="Retrieving Image..." />
              </div>
            ) : (
              <Image
                alt="NFT Image"
                src={imageUrl}
                width={700}
                height={700}
                className="rounded-lg"
              />
            )}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-4">Share Post Preview</h3>
              <div className="bg-gray-100 dark:bg-card rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Your Name</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      @username
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4">
                  I just minted a carbon credit NFT that offsets 20 tonnes of
                  CO2 emissions and helped plant 500 trees in Brazil! Check out
                  my environmental impact:
                </p>
                <Image
                  alt="NFT Image"
                  className="w-full h-48 object-cover rounded-lg mt-4"
                  height={400}
                  src="/images/araucaria-placeholder.jpg"
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 dark:bg-card rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">NFT Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Minted on:
                  </p>
                  <p className="font-semibold">
                    {new Date(retirement.timestamp * 1000).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Carbon Credits:
                  </p>
                  <p className="font-semibold">{retirement.count}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Project:
                  </p>
                  <p className="font-semibold">Reforestation in Brazil</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Certification:
                  </p>
                  <p className="font-semibold">Verified Carbon Standard</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-card rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">
                Environmental Impact
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    CO2 Emissions Offset:
                  </p>
                  <p className="font-semibold">{retirement.count}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Trees Planted:
                  </p>
                  <p className="font-semibold">500</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="bg-gray-100 dark:bg-card rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Share Your Environmental Impact
                </h3>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
