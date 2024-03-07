import { fetchQueue, fetchApplicantDetails } from '@/hooks/web3/queries';

export const fetchAllApplicants = async () => {
  try {
    const queueResult = await fetchQueue();

    // Assuming fetchQueue correctly returns an array of strings (account IDs)
    // Use a type guard to ensure each element is a string
    const queue = Array.isArray(queueResult) ? queueResult.filter((id): id is string => typeof id === 'string') : [];

    const applicantDetailsPromises = queue.map(async (accountId) => {
      const details = await fetchApplicantDetails(accountId);
      return { accountId, ...details };
    });

    const applicants = await Promise.all(applicantDetailsPromises);
    console.log(applicants);
    return applicants;
  } catch (error) {
    console.error('Error fetching applicant details:', error);
    throw error;
  }
};

fetchAllApplicants().then((applicants) => {
  console.log('Applicants:', applicants);
});
