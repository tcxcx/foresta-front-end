import { object, string, array, number } from 'zod';

export const addCollectiveSchema = object({
  name: string().min(1, "Collective name is required."),
  managers: array(number()).min(1, "At least one manager is required."),
  hash: string().min(1, "Collective hash is required."),
});

export const joinCollectiveSchema = object({
    collectiveId: number().min(1, "Collective ID is required."),
  });
 
  
export const createProposalSchema = object({
collectiveId: number().min(1, "Collective ID is required."),
proposalHash: string().min(1, "Proposal hash is required."),
});


export const voteSchema = object({
voteId: number().min(1, "Vote ID is required."),
voteCast: string().min(1, "Vote cast is required.").refine(data => ['yes', 'no'].includes(data), {
    message: "Vote cast must be 'yes' or 'no'.",
}),
});
