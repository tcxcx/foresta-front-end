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
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useLocale } from "next-intl";
import useRetirementStore from "@/hooks/context/retirementStore";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";

const CarbonRetirementToast: React.FC = () => {
  const locale = useLocale();
  const { cid } = useRetirementStore();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!cid) return;

      try {
        const response = await fetch(`/api/get-image-url?cid=${cid}`);
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, [cid]);
  console.log("Get Image URL!!!!!!!!!", imageUrl);

  return (
    <Card className="overflow-hidden group">
      <Link href={`/${locale}/dashboard/retirement-history/${cid}`}>
        <CardContent className="p-0">
          <div className="relative">
            <div className="flex justify-center">
              {imageUrl ? (
                <Image
                  alt="NFT Image"
                  src={imageUrl}
                  width={500}
                  height={500}
                  className="rounded-lg animate-shimmer"
                />
              ) : (
                <div className="w-full animate-shimmer h-64 flex items-center justify-center">
                  <Spinner text="Certificate Loading" />{" "}
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-secondary/50 transition-opacity">
                <p className="hover:underline px-4 py-2 rounded-md text-sm font-clash uppercase text-primary">
                  View Details
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage alt="Avatar" src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">0x1234567890abcdef</h3>
            <div className="flex items-center gap-2">
              <TreesIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">12.5 tCO2e</span>
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/${locale}/dashboard/retirement-history`}>
                View Your Retirement History
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
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
export default CarbonRetirementToast;
