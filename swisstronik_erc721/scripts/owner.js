const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedQuery = async (provider, destination, data) => {
  const rpcLink = hre.network.config.url;

  const [encryptedData, usedEncryptionKey] = await encryptDataField(rpcLink, data);

  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });

  return await decryptNodeResponse(rpcLink, response, usedEncryptionKey);
};

async function main() {
  const contractAddress = "0x..."; // Contract deployed

  const [signer] = await hre.ethers.getSigners();
  const provider = signer.provider;

  const contractFactory = await hre.ethers.getContractFactory("xxx"); // Name contract
  const contract = contractFactory.attach(contractAddress);

  const functionName = "owner";
  const data = contract.interface.encodeFunctionData(functionName);

  const responseMessage = await sendShieldedQuery(provider, contractAddress, data);
  
  const ownerAddress = contract.interface.decodeFunctionResult(functionName, responseMessage)[0];
  console.log("Contract owner:", ownerAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
