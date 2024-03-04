import { object, number, enum as zodEnum } from 'zod';

const UserLevel = zodEnum(['KYCLevel1', 'KYCLevel2', 'KYCLevel3']);

export const addMemberSchema = object({
  accountId: number().min(1, "Account ID is required."),
  kycLevel: UserLevel,
});

// This schema is for removing an existing member from the KYC list.
export const removeMemberSchema = object({
    accountId: number().min(1, "Account ID is required."),
  });
  

//   This schema allows modifying the KYC level of an existing member.
export const modifyMemberSchema = object({
accountId: number().min(1, "Account ID is required."),
newKycLevel: UserLevel,
});


// This schema is for adding a new authorized account that can perform KYC-related operations.
export const addAuthorizedAccountSchema = object({
    accountId: number().min(1, "Account ID is required."),
  });

// This schema is for removing an existing authorized account.

export const removeAuthorizedAccountSchema = object({
  accountId: number().min(1, "Account ID is required."),
});

// This schema is for removing an existing authorized account.

export const setKycAirdropAmountSchema = object({
amount: number().min(0, "Airdrop amount must be non-negative.").optional(),
});