// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BleuNFTStaker is ERC721, ERC721Holder {
    event Stake(address indexed to, uint256 indexed tokenId);
    event Unstake(address indexed to, uint256 indexed tokenId);
    event RewardPaid(address indexed to, uint256 indexed tokenId, uint256 amount);

    ERC721 public underlyingNFT;
    IERC20 public rewardToken;

    // 0.01 reward tokens per second
    uint256 public constant REWARD_RATE_PER_SECOND = 1e16;

    // Maps tokenId to the staker address
    mapping(uint256 => address) public stakerOf;

    // Maps tokenId to the timestamp when it was staked
    mapping(uint256 => uint256) public stakeTimestamp;

    // Maps user address to the list of tokenIds they have staked
    mapping(address => uint256[]) private stakedTokensOf;

    constructor(address _underlyingNFT, address _rewardToken) ERC721("BleuNFTStaker", "Bleu") {
        require(_underlyingNFT != address(0), "Invalid NFT contract");
        require(_rewardToken != address(0), "Invalid reward token");
        underlyingNFT = ERC721(_underlyingNFT);
        rewardToken = IERC20(_rewardToken);
    }

    function stake(uint256 tokenId) external {
        require(underlyingNFT.ownerOf(tokenId) == msg.sender, "Not token owner");
        require(stakerOf[tokenId] == address(0), "Token already staked");

        // Transfer the NFT to this contract
        underlyingNFT.safeTransferFrom(msg.sender, address(this), tokenId);

        // Mint a receipt NFT to represent the staked token
        _mint(msg.sender, tokenId);

        // Track staking info
        stakerOf[tokenId] = msg.sender;
        stakeTimestamp[tokenId] = block.timestamp;
        stakedTokensOf[msg.sender].push(tokenId);

        emit Stake(msg.sender, tokenId);
    }

    function unstake(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not staker");

        // Burn the receipt NFT
        _burn(tokenId);

        // Return the original NFT to the user
        underlyingNFT.safeTransferFrom(address(this), msg.sender, tokenId);

        // Calculate and pay rewards
        uint256 reward = calculateReward(tokenId);
        if (reward > 0) {
            require(rewardToken.balanceOf(address(this)) >= reward, "Insufficient reward balance");
            rewardToken.transfer(msg.sender, reward);
            emit RewardPaid(msg.sender, tokenId, reward);
        }

        // Cleanup
        delete stakerOf[tokenId];
        delete stakeTimestamp[tokenId];
        _removeTokenFromUser(msg.sender, tokenId);

        emit Unstake(msg.sender, tokenId);
    }

    function calculateReward(uint256 tokenId) public view returns (uint256) {
        uint256 stakedAt = stakeTimestamp[tokenId];
        if (stakedAt == 0) return 0;
        uint256 duration = block.timestamp - stakedAt;
        return duration * REWARD_RATE_PER_SECOND;
    }

    // Returns the total reward available for a user (across all staked NFTs)
    function rewardsOf(address user) external view returns (uint256 totalReward) {
        uint256[] memory tokens = stakedTokensOf[user];
        for (uint256 i = 0; i < tokens.length; i++) {
            totalReward += calculateReward(tokens[i]);
        }

        return totalReward;
    }

    // Internal: removes a tokenId from the user's staked list
    function _removeTokenFromUser(address user, uint256 tokenId) internal {
        uint256[] storage tokens = stakedTokensOf[user];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }
    }
}
