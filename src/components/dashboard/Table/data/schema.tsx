import { z } from "zod";


export const proposalSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.enum(['Passed', 'Failed', 'Deciding']),
  priority: z.enum(['Low', 'Medium', 'High']),
});

const voteDetailSchema = z.object({
  yesVotes: z.number(),
  noVotes: z.number(),
  end: z.string(),
  status: z.enum(['Passed', 'Failed', 'Deciding']),
  priority: z.enum(['Low', 'Medium', 'High']),
  collectiveId: z.number(),
  projectId: z.number().nullable(),
});

export type Proposal = z.infer<typeof proposalSchema>;
export type VoteDetail = z.infer<typeof voteDetailSchema>;
