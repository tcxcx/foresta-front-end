import Image from 'next/image';

interface IpfsButtonProps {
    cid: string;
  }

export default function IpfsButton({ cid }: IpfsButtonProps) {
  const ipfsLink = `${process.env.NEXT_PUBLIC_IPFS_ENDPOINT}${cid}`;

  return (
    <a
      className="cursor-pointer w-[20px] h-[20px] group"
      href={ipfsLink}
      target="_blank"
      rel="noreferrer"
    >
      <div className="group-hover:hidden w-[20px] h-[20px] relative">
        <Image
          src="/images/logoIpfs.svg"
          alt="IPFS Logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
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
