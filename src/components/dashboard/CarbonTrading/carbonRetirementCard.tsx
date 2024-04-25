"use client";

import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { decodeHexString } from "@/lib/hexDecode";
import truncateMiddle from "truncate-middle";
import { Share } from "lucide-react";
import useRetirementStore from '@/hooks/context/useRetirementStore';
import { useRouter } from 'next/navigation';
import { RetirementData } from "@/hooks/context/useRetirementStore";

const CarbonRetirementCard: React.FC<{ retirement: RetirementData }> = ({
  retirement,
}) => {
  const { setSelectedRetirement } = useRetirementStore();
  const locale = useLocale();
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleClick = () => {
    setSelectedRetirement(retirement);
    router.push(`/${locale}/dashboard/retirement-history/${retirement.ipfsHash[0].replace("0x", "")}`);
  };


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
    <>
       <Card className="overflow-hidden group" onClick={handleClick}>
          <CardContent className="p-0">
            <div className="relative">
              <div className="flex justify-center">
                {loading ? (
                  <div className="w-full animate-shimmer h-48 flex items-center justify-center">
                    <Spinner text="Retrieving Certificate..." />
                  </div>
                ) : (
                  <Image
                    alt="NFT Certificate Image"
                    src={imageUrl}
                    width={700}
                    height={700}
                    className="rounded-lg"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-secondary/50 transition-opacity">
                  <p className="hover:underline px-4 py-2 rounded-md text-sm font-clash uppercase text-primary dark:text-teal-300">
                    Discover More
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt="Avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold hover:underline hover:text-primary">
                {truncateMiddle(retirement.account, 5, 5, "...")}
              </h3>
              <div className="flex items-center justify-end">
                <TreesIcon className="h-4 w-4 dark:text-teal-300 text-foreground" />
                <span className="text-sm font-semibold font-violet">
                  <strong className="font-clash text-primary text-3xl">
                    {retirement.count}
                    <span> </span>
                  </strong>
                  t
                  <strong className="font- dark:text-teal-300 text-primary text-base">
                    CO2
                  </strong>
                  e
                </span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <MoreHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="justify-end">
              <DropdownMenuItem>
                Share <Share className="h-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </>
  );
};

function MoreHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

function TreesIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
      <path d="M7 16v6" />
      <path d="M13 19v3" />
      <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
    </svg>
  );
}
export default CarbonRetirementCard;
