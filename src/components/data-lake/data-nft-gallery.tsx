import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";

type Props = {};

export default function DataGallery({}: Props) {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 p-6 md:col-span-2 lg:col-span-3">
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>NFT #5678</CardTitle>
                  <div className="justify-end text-center">
                    <Badge>Dataset</Badge>
                  </div>
                </div>
                <CardDescription>This dataset is capable of</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  alt="NFT Image"
                  className="mx-auto"
                  height="200"
                  src="/images/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    You have &lsquo;Run Access&lsquo; to this NFT.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>NFT #5678</CardTitle>
                  <div className="justify-end text-center">
                    <Badge>Dataset</Badge>
                  </div>
                </div>
                <CardDescription>This dataset is capable of</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  alt="NFT Image"
                  className="mx-auto"
                  height="200"
                  src="/images/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    You have &lsquo;Run Access&lsquo; to this NFT.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>NFT #5678</CardTitle>
                  <div className="justify-end text-center">
                    <Badge>Algo</Badge>
                  </div>
                </div>
                <CardDescription>This algorithm is capable of</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  alt="NFT Image"
                  className="mx-auto"
                  height="200"
                  src="/images/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    You have &lsquo;Run Access&lsquo; to this NFT.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>NFT #5678</CardTitle>
                  <div className="justify-end text-center">
                    <Badge>Dataset</Badge>
                  </div>
                </div>
                <CardDescription>This dataset is capable of</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  alt="NFT Image"
                  className="mx-auto"
                  height="200"
                  src="/images/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    You have &lsquo;Run Access&lsquo; to this NFT.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
