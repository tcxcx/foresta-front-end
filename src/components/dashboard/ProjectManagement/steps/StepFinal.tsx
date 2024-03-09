import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import CheckboxLight from "@/lib/foresta-icons/wired-outline-24-approved-checked.json";
import ErrorCrossLight from "@/lib/foresta-icons/wired-outline-25-error-cross.json";
import CheckboxDark from "@/lib/foresta-dark/wired-gradient-24-approved-checked.json";
import ErrorCrossDark from "@/lib/foresta-dark/wired-gradient-25-error-cross.json";
import { LordIcon } from "@/lib/lordicon/lord-icon";
import { useTheme } from "next-themes";

interface StepFinalProps {
  isSuccess: boolean | null;
}


const StepFinal: React.FC<StepFinalProps> = ({ isSuccess }) => {
  const { theme } = useTheme();

  const Checkbox = theme === "dark" ? CheckboxDark : CheckboxLight;
  const ErrorCross = theme === "dark" ? ErrorCrossDark : ErrorCrossLight;

  const errorIconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(ErrorCross)
  ).toString("base64")}`;
  const checkIconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(Checkbox)
  ).toString("base64")}`;

  if (isSuccess === null) {
    return <p>Submitting...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {isSuccess ? (
        <>
          <LordIcon
            src={checkIconDataUri}
            trigger="hover"
            colors={{ primary: "#303f9f" }}
            size={100}
          />
          <p className="font-clash dark:text-white text-black text-lg">Submission was successful!</p>
        </>
      ) : (
        <>
          <LordIcon
            src={errorIconDataUri}
            trigger="hover"
            colors={{ primary: "#d32f2f" }}
            size={36}
          />
          <p className="font-clash dark:text-white text-blacktext-lg">Submission failed.</p>
        </>
      )}
    </div>
  );
};

export default StepFinal;