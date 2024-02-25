import React from 'react';

interface ButtonOffsetProps {
  onClick: () => void; 
}

const ButtonOffset: React.FC<ButtonOffsetProps> = ({ onClick }) => {
  return (

<button       onClick={onClick}
 className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Purchase Carbon Credits
</button>
  );
}

export default ButtonOffset;

