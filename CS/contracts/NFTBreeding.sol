// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTBreeding is ERC721Enumerable, Ownable {

    // NFT 정보를 저장하는 구조체
    struct NFTInfo {
        uint256 generation; // NFT 세대
        uint256 dna; // NFT의 유전 정보 (예: DNA 문자열 또는 숫자)
    }

    // NFT tokenId에 대한 정보 매핑
    mapping(uint256 => NFTInfo) public nftInfo;

    // NFT 세대 카운터
    uint256 public generationCounter = 0;

    // NFT 생성 이벤트
    event NFTCreated(address owner, uint256 tokenId, uint256 generation, uint256 dna);

    constructor() ERC721("NFTBreeding", "NFTB") {}

    // 새로운 NFT 생성
    function createNFT(uint256 _dna) external onlyOwner {
        uint256 tokenId = totalSupply() + 1;
        generationCounter++;
        _mint(msg.sender, tokenId);
        nftInfo[tokenId] = NFTInfo(generationCounter, _dna);
        emit NFTCreated(msg.sender, tokenId, generationCounter, _dna);
    }

    // NFT 두 마리를 교배하여 새로운 NFT 생성
    function breedNFT(uint256 tokenId1, uint256 tokenId2, uint256 newDna) external {
        require(_exists(tokenId1) && _exists(tokenId2), "Both parents must exist");
        require(ownerOf(tokenId1) == msg.sender && ownerOf(tokenId2) == msg.sender, "You must own both parents");
        
        // 교배 로직을 구현하고 새로운 NFT 생성
        // (예: DNA 조합, 세대 설정 등)

        // 새로운 NFT 생성
        uint256 newTokenId = totalSupply() + 1;
        _mint(msg.sender, newTokenId);
        nftInfo[newTokenId] = NFTInfo(generationCounter, newDna);
        emit NFTCreated(msg.sender, newTokenId, generationCounter, newDna);
    }
}