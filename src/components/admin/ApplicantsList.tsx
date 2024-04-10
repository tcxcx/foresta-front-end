'use client';

import React, { useState, useEffect } from 'react';
import { fetchAllApplicants } from '@/hooks/web3/kycHooks/useFetchAllApplicants';
import { KycReviewDialog } from '@/components/admin/kyc-review';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Applicant {
    name: string;
    email: string;
    accountId: string;
  }

  export function ApplicantsList() {

    const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const fetchedApplicants = await fetchAllApplicants();
        setApplicants(fetchedApplicants);
      } catch (error) {
        console.error('Failed to fetch applicants', error);
      }
    };

    loadApplicants();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-left text-sm font-medium">
        <div className="pl-12">KYC Submitter</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
      <div className="space-y-8">
        {applicants.map((applicant, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                {/* Placeholder for avatar image */}
                <AvatarImage src={`/avatars/${index % 2 + 1}.png`} alt="Avatar" />
                <AvatarFallback>{applicant.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{applicant.name}</p>
                <p className="text-sm text-muted-foreground">{applicant.email}</p>
              </div>
            </div>
            <div className="font-medium">Pending Review</div>
            <KycReviewDialog applicantId={applicant.accountId} />
          </div>
        ))}
      </div>
    </div>
  );
}