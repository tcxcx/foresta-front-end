import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Image from "next/image";
import { Airplay } from "lucide-react";
export default function Component() {
  return (
    <div className="flex w-full min-h-screen bg-background dark:bg-background">
      <main className="flex bg-background flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-background">
        <div className="w-full mx-auto flex flex-col items-center gap-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Unlock the Power of <br/> Descentralized Climate Science
            </h1>
            <p className=" text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Harness cutting-edge algorithms and vast datasets to drive
              innovation and tackle the world&apos;s most pressing climate
              challenges through collaborative efforts with communities,
              scientists, and stakeholders.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800  shadow-md rounded-lg overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-700">
                <DatabaseIcon className="w-8 h-8 text-gray-900 dark:text-white" />
                <div className="grid gap-1">
                  <CardTitle className="text-gray-900 dark:text-white">
                    Secure Datasets
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Explore our encrypted and blockchain-based datasets
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-2 px-4 py-3">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <FileIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>climate_data_2023.csv</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>John Doe</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <FileIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>weather_patterns.json</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>Jane Smith</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 p-4">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                  Upload Dataset
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-700">
                <CodeIcon className="w-8 h-8 text-gray-900 dark:text-white" />
                <div className="grid gap-1">
                  <CardTitle className="text-gray-900 dark:text-white">
                    Secure Algorithms
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Leverage our encrypted and blockchain-based algorithms
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-2 px-4 py-3">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  Climate Model Optimization
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <GroupIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>12 Members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>6 Months</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 p-4">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                  Upload Algorithm
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-700">
                <ServerIcon className="w-8 h-8 text-gray-900 dark:text-white" />
                <div className="grid gap-1">
                  <CardTitle className="text-gray-900 dark:text-white">Compute Environment Integration</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Integrate a secure, sandboxed compute environment
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-2 px-4 py-3">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Secure Compute Environment</div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <LockIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>Encrypted Data</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>Sandboxed Environment</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 p-4">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                  Integrate Environment
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-700">
                <NetworkIcon className="w-8 h-8 text-gray-900 dark:text-white" />
                <div className="grid gap-1">
                  <CardTitle className="text-gray-900 dark:text-white">Decentralized Compute Network</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Connect to the decentralized compute network
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-2 px-4 py-3">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Compute Network Connection</div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Airplay className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>Login</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SettingsIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>Setup</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 p-4">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                  Connect Network
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="flex flex-col items-center gap-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Secure, Decentralized, and Transparent
            </h2>
            <p className="max-w-xl text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform leverages blockchain technology and Schroedinger NFTs
              to ensure secure data sharing, financial transactions, and revenue
              sharing, while enabling granular access control and data privacy.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                Get Started
              </Button>
              <Button
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                variant="outline"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* // use just for copyright replace with cards from magicUI */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              AI-Powered Analytics and Conservation
            </h2>
            <p className="max-w-xl text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform&apos;s AI/ML capabilities, such as automated dMRV
              (decentralized Measurement, Reporting, and Verification) and
              advanced analytics, drive data-driven decision-making and
              conservation efforts through collaborative initiatives with
              communities, scientists, and stakeholders.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                Explore Analytics
              </Button>
              <Button
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                variant="outline"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Collaborative Efforts for Environmental Impact
            </h2>
            <p className="max-w-xl text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform enables collaboration between communities,
              scientists, and stakeholders to address critical environmental
              challenges and support sustainable conservation initiatives,
              leveraging the power of collective knowledge and shared resources.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                Join Collaboration
              </Button>
              <Button
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                variant="outline"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Success Stories and Testimonials
            </h2>
            <p className="max-w-xl text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hear from our users about their experiences with successful
              collaborations, innovative solutions, and positive environmental
              outcomes achieved through our platform.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-700" />
              </Card>
            </div>
          </div>
          {/* // done copywriting use cards here continue */}



        </div>
      </main>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function GroupIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  );
}

function SchoolIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m4 6 8-4 8 4" />
      <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M18 5v17" />
      <path d="M6 5v17" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ServerIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function NetworkIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
