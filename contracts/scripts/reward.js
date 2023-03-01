require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const JourneyRewarder = await hre.ethers.getContractFactory(
    "JourneyRewarder"
  );

  const contract = await JourneyRewarder.attach(process.env.REWARDER_ADDRESS);

  console.log("JourneyRewarder attached to:", contract.address);

  console.log("Rewarding...");

  const res = await contract.reward(
    "0xE60841d51BBAAd1bA3D9fec01f9D1c6a35B937e2",
    "0xf7138Fa034295c083fB67dbDc9d977e7bB5227b4",
    "https://bafybeigrz57yfgkrw46zdaeqx4dihwtwuk2hvgi6gtzdcbmdohjbfmqgbq.ipfs.w3s.link/1.json",
    { value: hre.ethers.utils.parseEther("0.01") }
  );

  console.log("Rewarded!", res);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
