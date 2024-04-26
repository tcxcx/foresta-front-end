// The bounty-collaboration folder contains the page for the bounty and collaboration board.
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { SheetTrigger, SheetTitle, SheetDescription, SheetHeader, SheetFooter, SheetContent, Sheet } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function BountyBoard() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Climate Science dMRV Board
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore open dMRV projects, collaborate, and earn rewards.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input className="w-full max-w-xs" placeholder="Search dMRV projects..." type="search" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <FilterIcon className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>
                    <CodeIcon className="w-4 h-4 mr-2" />
                    Development
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    <PenIcon className="w-4 h-4 mr-2" />
                    Design
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    <VideoIcon className="w-4 h-4 mr-2" />
                    Content
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Bounty</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value="any">
                    <DropdownMenuRadioItem value="any">Any</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="low">
                      <DollarSignIcon className="w-4 h-4 mr-2" />
                      Low
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="medium">
                      <DollarSignIcon className="w-4 h-4 mr-2" />
                      <DollarSignIcon className="w-4 h-4 mr-2" />
                      Medium
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="high">
                      <DollarSignIcon className="w-4 h-4 mr-2" />
                      <DollarSignIcon className="w-4 h-4 mr-2" />
                      <DollarSignIcon className="w-4 h-4 mr-2" />
                      High
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid gap-6 md:gap-8 mt-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <CodeIcon className="w-8 h-8" />
                <div className="grid gap-1">
                  <CardTitle>dMRV Data Integration</CardTitle>
                  <CardDescription>Integrate dMRV data into an existing climate platform.</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <DollarSignIcon className="w-4 h-4 text-primary" />
                  <DollarSignIcon className="w-4 h-4 text-primary" />
                  <DollarSignIcon className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="flex items-center gap-2">
                  <CodeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Python, React</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">2 weeks</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm">View Details</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <PenIcon className="w-8 h-8" />
                <div className="grid gap-1">
                  <CardTitle>dMRV Data Visualization</CardTitle>
                  <CardDescription>Design visualizations for dMRV data.</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <DollarSignIcon className="w-4 h-4 text-primary" />
                  <DollarSignIcon className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="flex items-center gap-2">
                  <PenIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Data Visualization, Graphic Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">3 weeks</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm">View Details</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <VideoIcon className="w-8 h-8" />
                <div className="grid gap-1">
                  <CardTitle>dMRV Explainer Video</CardTitle>
                  <CardDescription>Create a short video explaining dMRV concepts.</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <DollarSignIcon className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="flex items-center gap-2">
                  <VideoIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Video Production</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">1 week</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm">View Details</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 right-4" variant="outline">
            <PlusIcon className="w-4 h-4 mr-2" />
            Submit dMRV Proposal
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Submit dMRV Proposal</SheetTitle>
            <SheetDescription>Form a team and submit a proposal for a dMRV project.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label className="mb-2" htmlFor="project-select">
                Project
              </Label>
              <div id="project-select">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a dMRV project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dmrv-data-integration">dMRV Data Integration</SelectItem>
                    <SelectItem value="dmrv-data-visualization">dMRV Data Visualization</SelectItem>
                    <SelectItem value="dmrv-explainer-video">dMRV Explainer Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="mb-2" htmlFor="team">
                Team Members
              </Label>
              <Textarea id="team" placeholder="Enter team member names or emails separated by commas" rows={3} />
            </div>
            <div>
              <Label className="mb-2" htmlFor="proposal">
                Proposal
              </Label>
              <Textarea id="proposal" placeholder="Describe your approach and qualifications" rows={5} />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Submit Proposal</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}


function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
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
  )
}


function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function PenIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
}


function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function VideoIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  )
}
