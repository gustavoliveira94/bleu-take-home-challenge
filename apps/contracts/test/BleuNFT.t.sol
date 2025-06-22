// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/BleuNFT.sol";

contract BleuNFTTest is Test {
    BleuNFT public bleuNFT;
    address user1 = address(0x1);
    address user2 = address(0x2);

    function setUp() public {
        bleuNFT = new BleuNFT();
    }

    function testInitialNameAndSymbol() public {
        assertEq(bleuNFT.name(), "BleuNFT");
        assertEq(bleuNFT.symbol(), "BNFT");
    }

    function testMintingIncreasesBalance() public {
        vm.prank(user1);
        bleuNFT.mint(1);

        assertEq(bleuNFT.ownerOf(1), user1);
        assertEq(bleuNFT.balanceOf(user1), 1);
    }

    function testCannotMintSameTokenTwice() public {
        vm.prank(user1);
        bleuNFT.mint(1);

        vm.expectRevert(); // Already minted
        vm.prank(user2);
        bleuNFT.mint(1);
    }

    function testMintEmitsEvent() public {
        vm.prank(user1);
        vm.expectEmit(true, true, false, true);
        emit BleuNFT.Mint(user1, 42);
        bleuNFT.mint(42);
    }
}
