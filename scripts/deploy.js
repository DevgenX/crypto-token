const hre = require("hardhat");

async function main() {
  const FunToken = await hre.ethers.getContractFactory("FunToken");
  const funToken = await FunToken.deploy(1000000);

  await funToken.deployed();

  console.log(`funToken with 1 ETH deployed to ${funToken.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
