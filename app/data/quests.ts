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
};

export const mockQuests: Quest[] = [
  {
    title: "DEX 101 with SpookySwap",
    description:
      "Explore swapping, LPing on SpookySwap, and staking on TRON with SpookySwap",
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
      title: "DEX 101 with SpookySwap",
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
      title: "DEX 101 with SpookySwap",
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
  },
  {
    title: "NFT 101 on PaintSwap",
    description: "Learn how to buy your first Fantom-native collectible",
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
  },
  {
    title: "Swapping on Beethoven X",
    description: "Learn how to swap on Beethoven X AMM pools",
    image_url: "/5.png",
    isJourney: false,
    nft_reward: {
      description: "Exclusive NFT for quest completion",
      image_url: "/sd_beethoven.jpg",
      preview_url: "/sd_beethoven.jpg",
      title: "DEX 101 with SpookySwap",
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
  },
  {
    title: "Earn on Yearn.Finance",
    description: "Learn how to yield farm on Yearn.finance vaults",
    image_url: "/6.png",
    isJourney: false,
    nft_reward: {
      description: "Exclusive NFT for quest completion",
      image_url: "/sd_yearn.jpg",
      preview_url: "/sd_yearn.jpg",
      title: "DEX 101 with SpookySwap",
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
  },
];
