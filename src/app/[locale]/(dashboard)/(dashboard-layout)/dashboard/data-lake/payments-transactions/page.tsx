// The payments-transactions folder contains the page for the payments and transactions
// overview.
'use client';

import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Image from "next/image";

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <CoinsIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>$125,000</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CoinsIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Bounties
                  </span>
                </div>
                <div className="text-gray-900 dark:text-gray-50">$50,000</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <ShoppingCartIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Sales
                  </span>
                </div>
                <div className="text-gray-900 dark:text-gray-50">$65,000</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <LeafIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Carbon Credits
                  </span>
                </div>
                <div className="text-gray-900 dark:text-gray-50">$10,000</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <WalletIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Royalties Paid</CardTitle>
                <CardDescription>$25,000</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CoinsIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Bounties
                  </span>
                </div>
                <div className="text-gray-900 dark:text-gray-50">$10,000</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <ShoppingCartIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Sales
                  </span>
                </div>
                <div className="text-gray-900 dark:text-gray-50">$13,000</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <LeafIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Carbon Credits
                  </span>
                </div>
                <div className="text-gray-900 dark:text-gray-50">$2,000</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <UserIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Active Collectives</CardTitle>
                <CardDescription>25</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TreesIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Forestry
                  </span>
                </div>
                <div className="text-gray-900 dark:text-gray-50">8</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <GlassWaterIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Water
                  </span>
                </div>
                <div className="text-gray-900 dark:text-gray-50">6</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <WindIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Renewable Energy
                  </span>
                </div>
                <div className="text-gray-900 dark:text-gray-50">11</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="max-w-6xl w-full mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Collective</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <CoinsIcon className="w-4 h-4" />
                    </TableCell>
                    <TableCell className="font-medium">
                      Bounty Payment
                    </TableCell>
                    <TableCell>Amazon Reforestation</TableCell>
                    <TableCell className="text-right">$10,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <ShoppingCartIcon className="w-4 h-4" />
                    </TableCell>
                    <TableCell className="font-medium">Data Sale</TableCell>
                    <TableCell>Borneo Forest Trust</TableCell>
                    <TableCell className="text-right">$25,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <LeafIcon className="w-4 h-4" />
                    </TableCell>
                    <TableCell className="font-medium">
                      Carbon Credit Transfer
                    </TableCell>
                    <TableCell>Rainforest Alliance</TableCell>
                    <TableCell className="text-right">5,000 CCR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <WalletIcon className="w-4 h-4" />
                    </TableCell>
                    <TableCell className="font-medium">
                      Royalty Payment
                    </TableCell>
                    <TableCell>Climate Analytics</TableCell>
                    <TableCell className="text-right">$2,500</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function CoinsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function GlassWaterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z" />
      <path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" />
    </svg>
  );
}

function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
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

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function WalletIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function WindIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}
