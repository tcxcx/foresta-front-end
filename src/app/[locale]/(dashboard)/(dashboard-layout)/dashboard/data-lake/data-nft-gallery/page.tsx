"use client";

import React from "react";
import NFTDataGallery from "@/components/data-lake/data-nft-gallery";
import { useLocale } from "next-intl";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";

const PurchasedNFTsPage = () => {
  const locale = useLocale();

  return (
    <>
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Your <span className="font-clash">Algo</span>
            <span className="text-primary font-clash">/</span>
            <span className="font-clash">Data</span> NFT Collection
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            View and manage your curated collection of data and algorithms.
            Access exclusive resources, engage with proprietary content, and
            leverage your NFTs to explore cutting-edge climate science projects.
          </p>
        </div>
      </div>
      <NFTDataGallery />
      <div className="mt-4 flex justify-center">
        <Link href={`/${locale}/dashboard/data-lake/algorithm-execution`}>
          <Button className="uppercase font-clash">
            Execute Your Algorithms
          </Button>
        </Link>
      </div>
    </>
  );
};

export default PurchasedNFTsPage;
