import Image from 'next/image';

// Define a type for the component props
interface IpfsButtonProps {
    cid: string;
  }

export default function IpfsButton({ cid }: IpfsButtonProps) {
  // Construct the full URL for the IPFS link
  const ipfsLink = `${process.env.NEXT_PUBLIC_IPFS_ENDPOINT}${cid}`;

  return (
    <a
      className="cursor-pointer w-[20px] h-[20px] group"
      href={ipfsLink}
      target="_blank"
      rel="noreferrer"
    >
      {/* Use the Image component for the inactive logo, showing it by default */}
      <div className="group-hover:hidden w-[20px] h-[20px] relative">
        <Image
          src="/images/logoIpfs.svg"
          alt="IPFS Logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* Use the Image component for the active logo, showing it on hover */}
      <div className="hidden group-hover:block w-[20px] h-[20px] relative">
        <Image
          src="/images/logoIpfsActive.svg"
          alt="Active IPFS Logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </a>
  );
}
