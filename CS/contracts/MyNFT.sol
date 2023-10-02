// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    constructor() ERC721("MyNFT", "NFT") {}

    // 토큰을 생성하고 URI를 설정하는 함수
    function mintWithURI(address to, uint256 tokenId, string memory tokenURI) external onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}