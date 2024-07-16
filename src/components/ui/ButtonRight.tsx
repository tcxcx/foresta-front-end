import React from "react";

type ButtonRightProps = {
  onClick: () => void;
  disabled: boolean;
  text: string;
  stateText: string;
};

export const ButtonRight: React.FC<ButtonRightProps> = ({
  onClick,
  disabled,
  text,
  stateText,
}) => {
  // Conditionally apply classes based on the disabled state
  const transitionClass = disabled
    ? "w-[2px]"
    : "transition-all group-hover:w-full";
  const textColorClass = disabled
    ? "text-indigo-600"
    : "text-indigo-600 group-hover:text-white transition-colors";
  const cursorClass = disabled ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-clash text-blue-950 uppercase p-2 ${cursorClass}`}
    >
      <span
        className={`group relative inline-block overflow-hidden border rounded-lg border-primary dark:border-secondary px-8 py-3 focus:outline-none focus:ring`}
      >
        <span
          className={`absolute inset-y-0 right-0 w-[2px] bg-primary ${transitionClass} group-active:bg-primary/10 duration-300 ease-in-out`}
        ></span>
        <span className={`relative text-xs lg:text-xl ${textColorClass}`}>
          {disabled ? stateText : text}
        </span>
      </span>
    </button>
  );
};
