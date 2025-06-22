// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/BleuNFT.sol";
import "../src/BleuNFTStaker.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Simple ERC20 mock to simulate reward token behavior
contract MockRewardToken is ERC20 {
    constructor() ERC20("Reward", "RWD") {
        _mint(msg.sender, 1_000_000 ether); // Mint a large supply to the deployer
    }
}

contract BleuNFTStakerTest is Test {
    BleuNFT public nft;
    BleuNFTStaker public staker;
    MockRewardToken public reward;

    address user = address(0x1);

    function setUp() public {
        // Deploy NFT and reward contracts
        nft = new BleuNFT();
        reward = new MockRewardToken();
        staker = new BleuNFTStaker(address(nft), address(reward));

        // Mint NFT to user
        vm.prank(user);
        nft.mint(1);

        // Transfer reward tokens to the staking contract
        reward.transfer(address(staker), 1_000 ether);
    }

    function testStakeAndUnstakeNFT() public {
        vm.startPrank(user);

        // Approve the staker to transfer NFT
        nft.approve(address(staker), 1);

        // Stake the NFT
        staker.stake(1);

        // Assertions after staking
        assertEq(nft.ownerOf(1), address(staker));
        assertEq(staker.ownerOf(1), user);
        assertEq(staker.stakerOf(1), user);

        // Move time forward by 100 seconds
        vm.warp(block.timestamp + 100);

        uint256 expectedReward = 100 * staker.REWARD_RATE_PER_SECOND();

        // Unstake the NFT and receive rewards
        staker.unstake(1);

        // Assertions after unstaking
        assertEq(nft.ownerOf(1), user);
        assertEq(reward.balanceOf(user), expectedReward);
        assertEq(staker.stakerOf(1), address(0));

        vm.stopPrank();
    }

    function testCannotStakeIfNotOwner() public {
        // Mint NFT
        vm.startPrank(user);        
        nft.mint(5);
        vm.stopPrank();

        // Create another account
        address attacker = address(0x1234);
        vm.startPrank(attacker);   
        vm.expectRevert("Not token owner");  
        staker.stake(1);               
        vm.stopPrank();
    }

    function testCannotDoubleStake() public {
        vm.startPrank(user);
        nft.mint(2);
        nft.approve(address(staker), 2);
        staker.stake(2);

        // Try to stake again while already staked   
        vm.expectRevert();     
        staker.stake(2);  
        vm.stopPrank();
    }

    function testRewardsOfUser() public {
        vm.prank(user);
        nft.approve(address(staker), 1);
        vm.prank(user);
        staker.stake(1);

        // Advance time by 200 seconds
        vm.warp(block.timestamp + 200);

        // Check total rewards available to user
        uint256 rewardView = staker.rewardsOf(user);
        assertEq(rewardView, 200 * staker.REWARD_RATE_PER_SECOND());
    }

    function testUnstakeRevertsIfNotOwner() public {
        vm.prank(user);
        nft.approve(address(staker), 1);
        vm.prank(user);
        staker.stake(1);

        // Attempt to unstake as a non-owner
        vm.expectRevert("Not staker");
        staker.unstake(1); // msg.sender is this contract
    }

    function testRewardZeroIfNeverStaked() public {
        // Rewards should be zero for non-existent stakes
        uint256 reward = staker.calculateReward(999);
        assertEq(reward, 0);
    }
}
