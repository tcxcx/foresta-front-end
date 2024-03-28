// const onSubmit = async (data: ProjectFormData) => {
//     const timestamp = Date.now();
//     const projectTypeKey = data.projectType as projectTypeEnum;

//     const sdgDetails = Array.isArray(data.sdgDetails)
//       ? data.sdgDetails.map((item) => ({
//           ...item,
//           references: Array.isArray(item.references) ? item.references : [],
//         }))
//       : [];

//     const safeConvertToStringArray = (
//       input: string | string[] | undefined
//     ): string[] => {
//       if (Array.isArray(input)) {
//         return input;
//       } else if (typeof input === "string") {
//         return input.split(",").map((s) => s.trim());
//       } else {
//         return [];
//       }
//     };

//     const images = safeConvertToStringArray(data.images);
//     const videos = safeConvertToStringArray(data.videos);
//     const documents = safeConvertToStringArray(data.documents);

//     let batchGroups: {
//       uuid: string;
//       assetId: number;
//       totalSupply: bigint;
//       minted: bigint;
//       retired: bigint;
//       batches: any[];
//     }[] = [];
//     if (Array.isArray(data.batchGroups)) {
//       batchGroups = data.batchGroups.map((group) => ({
//         ...group,
//         uuid: uuid(),
//         assetId: 0,
//         totalSupply: BigInt(group.totalSupply),
//         minted: group.minted ? BigInt(group.minted) : BigInt(0),
//         retired: group.retired ? BigInt(group.retired) : BigInt(0),
//         batches: Array.isArray(group.batches)
//           ? group.batches.map((batch) => ({
//               ...batch,
//               totalSupply: BigInt(batch.totalSupply),
//               minted: batch.minted ? BigInt(batch.minted) : BigInt(0),
//               retired: batch.retired ? BigInt(batch.retired) : BigInt(0),
//             }))
//           : [],
//       }));
//     }

//     const updatedData = {
//       ...data,
//       projectType: projectTypeKey,
//       created: timestamp,
//       updated: timestamp,
//       images,
//       videos,
//       documents,
//       sdgDetails,
//       batchGroups,
//       royalties: Array.isArray(data.royalties) ? data.royalties.map(royalty => ({
//         recipient: royalty.recipient.trim(),
//         percentage: parseFloat(royalty.percentage.toString()),
//       })) : [],
      
//     };
    
//     console.log("Refactored form data for submission:", updatedData);

//     try {
//       await createProject(currentUserAddress, updatedData);
//       console.log("Project submitted successfully");
//       setSubmissionSuccess(true);
//     } catch (error) {
//       console.error("Failed to submit the project:", error);
//       setSubmissionSuccess(false);
//     }

//     setCurrentStep(5);
//     setTimeout(() => {
//       form.reset();
//       setCurrentStep(1);
//       setSubmissionSuccess(null);
//     }, 20000);
//   };