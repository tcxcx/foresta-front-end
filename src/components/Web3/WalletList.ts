enum WalletTypes {
    POLKADOT_JS = "polkadot-js",
    SUBWALLET_JS = "subwallet-js",
    TALISMAN = "talisman",
    POLKAGATE = "polkagate",
    NOVA = "nova",
  }
  
  interface WalletInfo {
    extensionName: WalletTypes;
    title: string;
    installUrl: string;
    logoSrc: string;
  }
  
  const Wallets: WalletInfo[] = [
    {
      extensionName: WalletTypes.POLKADOT_JS,
      title: "Polkadot.js",
      installUrl: "https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd",
      logoSrc: "/images/WalletPolkadotjs.svg",
    },
    {
      extensionName: WalletTypes.TALISMAN,
      title: "Talisman",
      installUrl: "https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld",
      logoSrc: "/images/WalletTailsman.svg",
    },
    {
        extensionName: WalletTypes.NOVA,
        title: "Nova",
        installUrl: "https://novawallet.io/",
        logoSrc: "/images/WalletNova.svg",
      },
    {
        extensionName: WalletTypes.SUBWALLET_JS,
        title: "SubWallet",
        installUrl: "https://chrome.google.com/webstore/detail/subwallet/onhogfjeacnfoofkfgppdlbmlmnplgbn",
        logoSrc: "/images/WalletSubwallet.svg",
      },
  ];
  
  export { WalletTypes, Wallets };
  