import RetirementDetails from '@/components/dashboard/CarbonRetirements/RetirementDetails';

interface RetirementDetailsPageProps {
  params: {
    cid: string;
  };
}

const RetirementDetailsPage = ({ params }: RetirementDetailsPageProps) => {
  const { cid } = params;

  return <RetirementDetails cid={cid} />;
};

export default RetirementDetailsPage;