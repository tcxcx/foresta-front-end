import clsx from "clsx";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import Identicon from "@polkadot/react-identicon";
import truncateMiddle from 'truncate-middle';

type Props = {
  onSelect: () => void;
  account: InjectedAccountWithMeta;
  selected: boolean;
};

export const Account: React.FC<Props> = ({ account, selected, onSelect }) => (
  <div
    key={account.address}
    onClick={onSelect}
    className="group border cursor-pointer px-2 py-1 rounded-lg flex items-center justify-between pr-4 z-10"
  >
    <div className="flex items-center gap-4">
      <Identicon value={account.address} size={32} theme="polkadot" />
      <div className="flex flex-col">
        <div 
          className={clsx(
            "text-lg font-clash transition-colors duration-300 ease-in-out delay-50", 
            selected ? "text-indigo-600 dark:text-primary" : "text-black dark:text-white group-hover:text-indigo-600/80"
          )}
        >
          {account.meta.name}
        </div>
        <div className="text-stone-500 text-sm">{truncateMiddle(account.address, 5, 5, "...")}</div>
      </div>
    </div>
    <div className={clsx("h-2 w-2 rounded-full", selected ? "bg-primary" : "bg-secondary")} />
  </div>
);
