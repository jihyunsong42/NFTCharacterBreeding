const { ethers } = require("ethers");
const { writeFileSync } = require("fs");
const { network } = require("hardhat");

// Import your ERC-721 contract
const MyNFT = artifacts.require("MyNFT");

async function main() {
  // Connect to your Ethereum provider
  const provider = new ethers.providers.JsonRpcProvider(network.config.url);
  
  // Connect to your wallet (ensure you have funds in the wallet)
  const wallet = new ethers.Wallet("YOUR_WALLET_PRIVATE_KEY", provider);

  // Create an instance of your ERC-721 contract
  const nftContract = new ethers.Contract("YOUR_NFT_CONTRACT_ADDRESS", MyNFT.abi, wallet);

  // Create and mint 1000 NFTs with different metadata
  const numNFTs = 1000;
  const nfts = [];

  for (let i = 0; i < numNFTs; i++) {
    const tokenId = i + 1;
    const metadata = {
      name: `NFT ${tokenId}`,
      description: `This is NFT ${tokenId}`,
      image: `https://example.com/images/nft_${tokenId}.jpg`,
      // Add other metadata properties as needed
    };

    // Convert metadata to JSON and store it on IPFS or elsewhere
    const metadataURI = `https://example.com/metadata/nft_${tokenId}.json`;
    writeFileSync(`nft_${tokenId}.json`, JSON.stringify(metadata, null, 2));

    // Mint the NFT with the URI to the metadata
    await nftContract.mintWithURI(wallet.address, tokenId, metadataURI);

    nfts.push({
      tokenId,
      metadataURI,
    });

    console.log(`Minted NFT ${tokenId}`);
  }

  console.log("All NFTs minted!");
  console.log(nfts);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});