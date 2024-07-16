import { hexToString } from '@polkadot/util';

export const decodeHexString = (hexString: string): string => {
  try {
    return hexToString(hexString);
  } catch (error) {
    console.error('Error decoding hex string:', error);
    return hexString;
  }
};