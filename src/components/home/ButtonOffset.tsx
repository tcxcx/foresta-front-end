import React from "react";

interface ButtonOffsetProps {
  onClick: () => void;
  buttonText: string; // Add this prop for the button text
}

const ButtonOffset: React.FC<ButtonOffsetProps> = ({ onClick, buttonText }) => {
  return (
    <button
      onClick={onClick}
      className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
    >
      {buttonText}
    </button>
  );
};

export default ButtonOffset;
