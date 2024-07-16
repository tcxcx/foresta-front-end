'use client'

import { RetirementDetails } from '@/components/dashboard/CarbonRetirements/RetirementDetails';
import useRetirementStore from '@/hooks/context/useRetirementStore';

interface RetirementDetailsPageProps {
  params: {
    cid: string;
  };
}

const RetirementDetailsPage = ({ params }: RetirementDetailsPageProps) => {
  const { selectedRetirement } = useRetirementStore();

  if (!selectedRetirement) {
    return <p>Loading... or navigate back to select a retirement</p>;
  }

  return <RetirementDetails retirement={selectedRetirement} />;
};

export default RetirementDetailsPage;