// The scientist-profile folder contains a dynamic route [id] for individual scientist profile 
// pages.

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
export default function ScientistProfile() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Dr. Emily Hawkins</h1>
                <p className="text-gray-500 md:text-xl dark:text-gray-400">Senior Climate Scientist</p>
              </div>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Dr. Emily Hawkins is a renowned climate scientist with over 15 years of experience in the field. Her
                research focuses on understanding the impacts of climate change on ecosystems and developing strategies
                for conservation and sustainable resource management.
              </p>
            </div>
            <Image
              alt="Dr. Emily Hawkins"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              height="550"
              src="/placeholder.svg"
              width="550"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Research Interests
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Areas of Expertise</h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Climate Modeling</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Developing and utilizing advanced climate models to predict future climate scenarios and their impacts.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Ecosystem Resilience</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Studying the resilience of ecosystems to climate change and developing strategies for conservation and
                adaptation.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Sustainable Resource Management</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Developing sustainable practices for the management of natural resources in the face of climate change.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Publications</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Academic Papers and Research</h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-2">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">
              &quot;Climate Change and Ecosystem Resilience: A Case Study of the Amazon Rainforest&quot;
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Published in Nature Climate Change, 2021</p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">
              &quot;Sustainable Resource Management in a Changing Climate: Strategies for the Future&quot;
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Published in Environmental Science & Policy, 2019
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">&quot;Predicting the Impacts of Climate Change on Coastal Ecosystems&quot;</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Published in Journal of Coastal Research, 2017</p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">&quot;Improving Climate Models for Better Predictions&quot;</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Published in Geophysical Research Letters, 2015
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Projects</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Conservation Initiatives</h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <Image
              alt="Amazon Rainforest Conservation Project"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/placeholder.svg"
              width="550"
            />
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-xl font-bold">Amazon Rainforest Conservation Project</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Dr. Hawkins has been leading a multi-year project to study the impacts of climate change on the Amazon
                rainforest and develop strategies for its conservation. The project involves collaboration with local
                communities, government agencies, and international organizations.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <Image
              alt="Coastal Ecosystem Resilience Initiative"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="310"
              src="/placeholder.svg"
              width="550"
            />
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-xl font-bold">Coastal Ecosystem Resilience Initiative</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Dr. Hawkins is currently leading a global initiative to study the impacts of climate change on coastal
                ecosystems and develop strategies for their resilience. The project involves collaboration with
                researchers from around the world and aims to provide actionable recommendations for policymakers and
                stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Datasets & Algorithms
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contributed Resources</h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-2">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Amazon Rainforest Climate Data</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A comprehensive dataset of climate data collected from the Amazon rainforest over the past decade.
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  Collaborate
                </Button>
                <Button size="sm" variant="outline">
                  Make Public
                </Button>
              </div>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Coastal Ecosystem Resilience Model</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A machine learning model for predicting the resilience of coastal ecosystems to climate change.
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  Collaborate
                </Button>
                <Button size="sm" variant="outline">
                  Make Public
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Education</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Academic Timeline</h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Ph.D. in Climate Science</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Massachusetts Institute of Technology, 2008 - 2012
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">M.S. in Environmental Science</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Stanford University, 2005 - 2007</p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">B.S. in Earth Sciences</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                University of California, Berkeley, 2001 - 2005
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Contact</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2">
                <MailIcon className="h-6 w-6" />
                <span>emily.hawkins@university.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <TwitterIcon className="h-6 w-6" />
                <span>@DrEmilyHawkins</span>
              </div>
              <div className="flex items-center gap-2">
                <LinkedinIcon className="h-6 w-6" />
                <span>linkedin.com/in/emilyhawkins</span>
              </div>
            </div>
            <div>
              <Textarea className="w-full" placeholder="Leave a message..." rows={4} />
              <Button className="mt-4 w-full">Send Message</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function MailIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
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
  )
}
