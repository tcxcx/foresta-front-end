import { useState, useEffect } from "react";
import { collectivesName } from "@/hooks/web3/queries";

const useCollectiveName = (selectedCollectiveId: number | null): string => {
  const [collectiveName, setCollectiveName] = useState("");

  useEffect(() => {
    if (selectedCollectiveId !== null) {
      const fetchCollectiveName = async () => {
        try {
          const nameResult = await collectivesName(selectedCollectiveId);
          if (nameResult && typeof nameResult === 'object' && 'name' in nameResult) {
            if (typeof nameResult.name === 'string') {
              setCollectiveName(nameResult.name);
            } else {
              console.log("Name property is not a string:", nameResult.name);
              setCollectiveName("Invalid name format");
            }
          } else if (typeof nameResult === 'string') {
            setCollectiveName(nameResult);
          } else {
            console.log("Unexpected type or undefined for collective name:", nameResult);
            setCollectiveName("Name not available");
          }
        } catch (error) {
          console.error("Failed to fetch collective name:", error);
          setCollectiveName("Failed to load name");
        }
      };
      fetchCollectiveName();
    }
  }, [selectedCollectiveId]);

  return collectiveName;
};

export default useCollectiveName;
