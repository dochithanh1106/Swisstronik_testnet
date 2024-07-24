const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("xxx");

  await contract.waitForDeployment();

  console.log(`xxx contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
