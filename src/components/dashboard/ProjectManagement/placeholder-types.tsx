import wiredInvestmentAnimationLight from "@/lib/foresta-icons/wired-outline-947-investment.json";
import wiredInvestmentAnimationDark from "@/lib/foresta-dark/wired-gradient-947-investment.json";
import wiredEnvironemntLight from "@/lib/foresta-icons/wired-outline-945-dividends.json";
import wiredEnvironemntDark from "@/lib/foresta-dark/wired-gradient-437-environment-eco-care.json";
import CraneLight from "@/lib/foresta-icons/wired-outline-1128-crane-bird.json";
import CraneDark from "@/lib/foresta-dark/wired-gradient-1128-crane-bird.json";
import HummingBirdLight from '@/lib/foresta-icons/wired-outline-1135-hummingbird.json'
import HummingBirdDark from '@/lib/foresta-dark/wired-gradient-1135-hummingbird.json'

export enum PlaceholderType {
  Tokens = "Tokens",
  Project = "Project",
  Collectives = "Collectives",
  AllCollectives = "AllCollectives",
  sendTx = "sendTx",
  Retirements = "Retirements"
}

type PlaceholderProps = {
  [key in PlaceholderType]: {
    light: string;
    dark: string;
    title: string;
    description: string;
    imageData: string;
  };
};

export const placeholderProps = {
  [PlaceholderType.Tokens]: {
    light: wiredInvestmentAnimationLight,
    dark: wiredInvestmentAnimationDark,
    title: "Mint New Tokens",
    description:
      "Ready to convert your project contributions into tokens? Start here.",
      imageData: "",
  },
  [PlaceholderType.Project]: {
    light: wiredEnvironemntLight,
    dark: wiredEnvironemntDark,
    title: "Submit a New Project",
    description:
      "Have a conservation project? Share the details with us to get started.",
      imageData: "",
  },
  [PlaceholderType.Collectives]: {
    light: CraneLight,
    dark: CraneDark,
    title: "No Collectives Found",
    description:
      "You are currently not a part of any given collective. See upcoming collectives to see if you have been whitelisted to join a Conservation DAO.",
      imageData: "",
  },
  [PlaceholderType.AllCollectives]: {
    light: CraneLight,
    dark: CraneDark,
    title: "No Collectives Found",
    description: "No collectives live or upcoming in the platform yet.",
    imageData: "",
  },
  [PlaceholderType.Retirements]: {
    light: CraneLight,
    dark: CraneDark,
    title: "No Retirements Found",
    description: "No retirement certificates have been issued to your account yet.",
    imageData: "",
  },
  [PlaceholderType.sendTx]: {
    light: HummingBirdLight,
    dark: HummingBirdDark,
    title: "",
    description: "",
    imageData: "",
  },

};
