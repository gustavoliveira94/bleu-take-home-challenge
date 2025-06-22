// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/BleuNFTRewards.sol";

/// @title Unit tests for the BleuNFTRewards ERC20 token contract
contract BleuNFTRewardsTest is Test {
    BleuNFTRewards public rewardToken;

    address public deployer = address(0x1);
    address public user = address(0x2);

    /// @notice Deploy the contract before each test
    function setUp() public {
        // Deploy the token contract using the deployer account
        vm.prank(deployer);
        rewardToken = new BleuNFTRewards();
    }

    /// @notice Test that the deployer receives the initial token supply
    function testInitialMintToDeployer() public {
        uint256 expectedBalance = 1_000_000 ether;
        uint256 balance = rewardToken.balanceOf(deployer);

        // Check that the deployer received the initial supply
        assertEq(balance, expectedBalance, "Deployer should have initial supply");
    }

    /// @notice Test that token metadata is correctly set
    function testTokenMetadata() public {
        assertEq(rewardToken.name(), "BleuToken", "Token name should be BleuToken");
        assertEq(rewardToken.symbol(), "BLEU", "Token symbol should be BLEU");
    }

    /// @notice Test a successful transfer between accounts
    function testTransferTokens() public {
        uint256 amount = 100 ether;

        // Transfer tokens from deployer to user
        vm.startPrank(deployer);
        rewardToken.transfer(user, amount);
        vm.stopPrank();

        // Check that user received the tokens
        assertEq(rewardToken.balanceOf(user), amount, "User should receive 100 BLEU");

        // Check that deployer's balance was reduced
        assertEq(
            rewardToken.balanceOf(deployer),
            1_000_000 ether - amount,
            "Deployer should have remaining tokens"
        );
    }
}
