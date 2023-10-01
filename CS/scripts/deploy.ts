const { ethers } = require("hardhat");
import ContractABI from '../artifacts/contracts/NFTBreeding.sol/NFTBreeding.json';

async function main() {
  const NFTBreeding = await ethers.getContractFactory("NFTBreeding");
  const nftBreeding = await NFTBreeding.deploy();

  // console.log(await nftBreeding.isOwner());
  
  // const provider = new ethers.JsonRpcProvider('https://arb-goerli.g.alchemy.com/v2/E4VcLohsWAkBjxxPapK278zKQLXzlQ1W');
  // const contractAddress = '0x08a9207e9A71c4A52d10cCa9180e76690537E996';
  // const contract = new ethers.Contract(contractAddress, ContractABI.abi, provider);
  // console.log(contract);
  // await contract.getOwner();
  await nftBreeding.createNFT(1);

  // console.log("NFTCombiner deployed to:", nftBreeding.address);
  // console.log(nftBreeding);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });