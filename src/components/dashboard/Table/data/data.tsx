import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "Passed",
      label: "Passed",
      icon: CheckCircledIcon,
    },
    {
      value: "Failed",
      label: "Failed",
      icon: CrossCircledIcon,
    },
    {
      value: "Deciding",
      label: "Deciding",
      icon: StopwatchIcon,
    },
  ];
  
  export const priorities = [
    {
      label: "Low",
      value: "Low",
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "Medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "High",
      icon: ArrowUpIcon,
    },
  ];
  