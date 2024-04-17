import { z } from "zod";

const voteDetailSchema = z.object({
  yesVotes: z.string().transform((value) => parseInt(value, 10)),
  noVotes: z.string().transform((value) => parseInt(value, 10)),
  end: z.string().transform((value) => parseInt(value, 10)),
  status: z.enum(['Passed', 'Failed', 'Deciding']),
  priority: z.enum(['Low', 'Medium', 'High']),
  collectiveId: z.string().transform((value) => parseInt(value, 10)),
  projectId: z.string().nullable().transform(value => value ? parseInt(value, 10) : null),
});

export const proposalSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.enum(['Passed', 'Failed', 'Deciding']),
  priority: z.enum(['Low', 'Medium', 'High']),
  voteDetail: voteDetailSchema.optional(),
});

export type Proposal = z.infer<typeof proposalSchema>;
export type VoteDetail = z.infer<typeof voteDetailSchema>;
