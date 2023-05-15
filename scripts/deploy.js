const hre = require("hardhat");

async function main() {
  const FunToken = await hre.ethers.getContractFactory("FunToken");
  const funToken = await FunToken.deploy();

  await funToken.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${funToken.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
