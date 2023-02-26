export type Quest = {
  title: string;
  description: string;
  image_url: string;
  nft_reward: any;
  token_reward: any;
  partner: any;
  xp: number;
  id: string;
  isJourney: boolean;
  order: number;
  completed_users: any[];
  steps?: any;
};

export const mockQuests: Quest[] = [
  {
    title: "DEX 101 with SpookySwap",
    description:
      "Explore swapping, LPing on SpookySwap, and staking on Fantom with SpookySwap",
    image_url: "/sd_spookyswap.jpg",
    isJourney: false,
    nft_reward: {
      description: "Exclusive NFT for quest completion",
      image_url: "/sd_spookyswap.jpg",
      preview_url: "/sd_spookyswap.jpg",
      title: "DEX 101 with SpookySwap",
      token_uri: "",
    },
    token_reward: {
      amount: "10",
      fiat_amount: "10",
      symbol: "FTM",
    },
    xp: 400,
    id: "3Hr6HdFOM47cZwb5a69K",
    partner: {
      image_url: "/spookyswap.png",
    },
    order: 1,
    completed_users: [],
    steps: {
      0: {
        amount: 100,
        description: "Swap at least 1 FTM to BOO on SpookySwap.",
        start_url: "https://spooky.fi/#/swap",
        title: "Swap your FTM to BOO on SpookySwap",
        isTwitter: false,
      },
      1: {
        amount: 100,
        description:
          "Supply any FTM and BOO to the FTM-BOO pool on SpookySwap to earn fees when users swap in this pool.",
        start_url: "https://spooky.fi/#/add",
        title: "Provide liquidity to the FTM-BOO pool on SpookySwap",
        isTwitter: false,
      },
      2: {
        amount: 100,
        description:
          "Boost your earnings from Step 2 by staking your FTM-BOO LP tokens in the FTM-BOO farm.",
        start_url: "https://spooky.fi/#/farms",
        title: "Stake your LP tokens in the FTM-BOO Farm",
        isTwitter: false,
      },
      3: {
        amount: 100,
        description:
          "Show your love and support by following SpookySwap on Twitter!",
        start_url: "https://twitter.com/",
        title: "Follow SpookySwap on Twitter",
        isTwitter: true,
      },
    },
  },
  {
    title: "Liquid Staking on Stader",
    description: "Understand the basics of liquid staking with Stader",
    image_url: "/2.png",
    isJourney: false,
    nft_reward: {
      description: "Exclusive NFT for quest completion",
      image_url: "/sd_stader.jpg",
      preview_url: "/sd_stader.jpg",
      title: "Liquid Staking on Stader",
      token_uri: "",
    },
    token_reward: {
      amount: "10",
      fiat_amount: "10",
      symbol: "FTM",
    },
    xp: 400,
    id: "9Gl6qQNybiCNCyAlULwZ",
    partner: {
      image_url: "/stader.jpg",
    },
    order: 2,
    completed_users: [],
    steps: {
      0: {
        amount: 100,
        description:
          "Stake at least 1 FTM on Stader and receive staking rewards with sFTMX.",
        start_url: "https://www.staderlabs.com/fantom/liquid-staking/pools/",
        title: "Stake your FTM on Stader",
        isTwitter: false,
      },
      1: {
        amount: 100,
        description:
          "Show your love and support by following Stader on Twitter!",
        start_url: "https://twitter.com/",
        title: "Follow Stader on Twitter",
        isTwitter: true,
      },
    },
  },
  {
    title: "Lending 101 on Geist",
    description: "Learn how to lend and borrow on Geist Finance",
    image_url: "/3.png",
    isJourney: false,
    nft_reward: {
      description: "Exclusive NFT for quest completion",
      image_url: "/sd_geist.jpg",
      preview_url: "/sd_geist.jpg",
      title: "Lending 101 on Geist",
      token_uri: "",
    },
    token_reward: {
      amount: "10",
      fiat_amount: "10",
      symbol: "FTM",
    },
    xp: 400,
    id: "LX0JeE1m1Hmp6NCBiyNs",
    partner: {
      image_url: "/geist.jpg",
    },
    order: 5,
    completed_users: [],
    steps: {
      0: {
        amount: 100,
        description:
          "Deposit at least 1 FTM into Geist Finance to use as collateral for borrowing.",
        start_url: "https://geist.finance/deposit",
        title: "Deposit at least 1 FTM to earn yield",
        isTwitter: false,
      },
      1: {
        amount: 100,
        description:
          "Borrow USDC against your deposited FTM as collateral from Step 1.",
        start_url: "https://geist.finance/borrow",
        title: "Borrow USDC against your FTM collateral",
        isTwitter: false,
      },
      3: {
        amount: 100,
        description:
          "Show your love and support by following Geist Finance on Twitter!",
        start_url: "https://twitter.com/",
        title: "Follow Geist Finance on Twitter",
        isTwitter: true,
      },
    },
  },
  {
    title: "NFT 101 on PaintSwap",
    description:
      "Learn how to buy your first collectible on the Fantom blockchain",
    image_url: "/4.png",
    isJourney: false,
    nft_reward: {
      description: "Exclusive NFT for quest completion",
      image_url: "/sd_paintswap.jpg",
      preview_url: "/sd_paintswap.jpg",
      title: "DEX 101 with SpookySwap",
      token_uri: "",
    },
    token_reward: {
      amount: "10",
      fiat_amount: "10",
      symbol: "FTM",
    },
    xp: 400,
    id: "SOEKIWe2g0JDOKTZBl6N",
    partner: {
      image_url: "/paintswap.png",
    },
    order: 6,
    completed_users: [],
    steps: {
      0: {
        amount: 100,
        description:
          "Paintswap is an open NFT marketplace on Fantom. Buy any NFT on PaintSwap!",
        start_url: "https://paintswap.finance/",
        title: "Buy an NFT on PaintSwap",
        isTwitter: false,
      },
      1: {
        amount: 100,
        description:
          "Learn how to create your own unique NFT using the PaintSwap NFT creator platform.",
        start_url:
          "https://paintswap.finance/marketplace/fantom/factory/mintcommunity",
        title: "Mint your own NFT on PaintSwap",
        isTwitter: false,
      },
      2: {
        amount: 100,
        description:
          "Show your love and support by following PaintSwap on Twitter!",
        start_url: "https://twitter.com/",
        title: "Follow PaintSwap on Twitter",
        isTwitter: true,
      },
    },
  },
  {
    title: "DeFi 2.0 on Beethoven X",
    description: "Re-imagineer DeFi with Beethoven X relics",
    image_url: "/5.png",
    isJourney: false,
    nft_reward: {
      description: "Exclusive NFT for quest completion",
      image_url: "/sd_beethoven.jpg",
      preview_url: "/sd_beethoven.jpg",
      title: "DeFi 2.0 on Beethoven X",
      token_uri: "",
    },
    token_reward: {
      amount: "10",
      fiat_amount: "10",
      symbol: "FTM",
    },
    xp: 400,
    id: "V2zbf8iYGGGzFnkXQ6tB",
    partner: {
      image_url: "/beethoven.png",
    },
    order: 3,
    completed_users: [],
    steps: {
      0: {
        amount: 100,
        description: "Wrap at least 1 FTM into wFTM using Beethoven X Swap.",
        start_url: "https://beets.fi/swap",
        title: "Wrap your FTM into wFTM on Beethoven X",
        isTwitter: false,
      },
      1: {
        amount: 100,
        description: "Swap at least 1 FTM to BEETS using Beethoven X Swap.",
        start_url: "https://beets.fi/swap",
        title: "Swap your FTM into BEETS on Beethoven X",
        isTwitter: false,
      },
      2: {
        amount: 100,
        description:
          "Deposit your wFTM and BEETS into the BEETS farm to earn yield with maBEETS.",
        start_url: "https://beets.fi/mabeets",
        title: "Deposit your wFTM and BEETS into the BEETS farm",
        isTwitter: false,
      },
      3: {
        amount: 100,
        description:
          "Show your love and support by following Beethoven X on Twitter!",
        start_url: "https://twitter.com/",
        title: "Follow Beethoven X on Twitter",
        isTwitter: true,
      },
    },
  },
  {
    title: "Earn on Yearn.Finance",
    description: "Learn how to yield farm with Yearn.finance vaults",
    image_url: "/6.png",
    isJourney: false,
    nft_reward: {
      description: "Exclusive NFT for quest completion",
      image_url: "/sd_yearn.jpg",
      preview_url: "/sd_yearn.jpg",
      title: "Earn on Yearn.Finance",
      token_uri: "",
    },
    token_reward: {
      amount: "10",
      fiat_amount: "10",
      symbol: "FTM",
    },
    xp: 400,
    id: "k2JLHufwfjipZT9HGVIo",
    partner: {
      image_url: "/yearn.png",
    },
    order: 4,
    completed_users: [],
    steps: {
      0: {
        amount: 100,
        description: "Use any Fantom DEX to swap your FTM into 1 USDC.",
        start_url: "https://spooky.fi/#/swap",
        title: "Swap FTM into at least 1 USDC",
        isTwitter: false,
      },
      1: {
        amount: 100,
        description:
          "Deposit your USDC into the Yearn USDC Vault to earn yield on yvUSDC.",
        start_url:
          "https://yearn.finance/vaults/250/0xEF0210eB96c7EB36AF8ed1c20306462764935607",
        title: "Deposit your USDC and earn yield on yvUSDC",
        isTwitter: false,
      },
      3: {
        amount: 100,
        description:
          "Show your love and support by following Yearn.Finance on Twitter!",
        start_url: "https://twitter.com/",
        title: "Follow Yearn.Finance on Twitter",
        isTwitter: true,
      },
    },
  },
];
