// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract BleuNFTStaker is ERC721, ERC721Holder {
    event Stake(address indexed to, uint256 indexed tokenId);
    event Unstake(address indexed to, uint256 indexed tokenId);

    ERC721 public underlyingNFT;

    // Mapping from tokenId to staker address
    mapping(uint256 => address) public stakerOf;

    constructor(address _underlyingNFT) ERC721("BleuNFTStaker", "Bleu") {
        require(_underlyingNFT != address(0), "Invalid NFT contract");
        underlyingNFT = ERC721(_underlyingNFT);
    }

    function stake(uint256 tokenId) external {
        require(underlyingNFT.ownerOf(tokenId) == msg.sender, "Not token owner");
        require(stakerOf[tokenId] == address(0), "Token already staked");

        // Transfer the NFT from the user to this contract
        underlyingNFT.safeTransferFrom(msg.sender, address(this), tokenId);

        // Mintar NFT de recibo
        _mint(msg.sender, tokenId);

        // Track the staker
        stakerOf[tokenId] = msg.sender;
        emit Stake(msg.sender, tokenId);
    }

    function unstake(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not staker");
        // Burn the receipt NFT
        _burn(tokenId);
        // Transfer the NFT back to the user
        underlyingNFT.safeTransferFrom(address(this), msg.sender, tokenId);
        // Remove tracking
        delete stakerOf[tokenId];
        emit Unstake(msg.sender, tokenId);
    }
}
