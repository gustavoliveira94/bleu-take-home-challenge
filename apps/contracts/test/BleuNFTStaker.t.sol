// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {BleuNFTStaker} from "../src/BleuNFTStaker.sol";
import {BleuNFT} from "../src/BleuNFT.sol";
import "forge-std/Test.sol";

contract BleuNFTStakerTest is Test {
    BleuNFTStaker public staker;
    BleuNFT public nft;
    address user = address(0x1234);

    function setUp() public {
        nft = new BleuNFT();
        staker = new BleuNFTStaker(address(nft));   

        // Configurar o usuário com ETH
        vm.deal(user, 10 ether);     
    }

    function test_Stake() public {
        // Mintar um NFT para o usuário
        vm.prank(user);
        nft.mint();
        console.log("NFT owner: %s", nft.ownerOf(0));

        // Verificar posse e estado antes do stake
        assertEq(nft.ownerOf(0), user, "User should own NFT");
        console.log("BleuNFTStaker address: %s", address(staker));
        console.log("User address: %s", user);

        // Tentar fazer stake
        vm.prank(user);
        staker.stake(0);
    }

    function testUnderlyingNFTAddress() public {
        // Verificar o endereço do underlyingNFT
        console.log("underlyingNFT address: %s");
        // assertEq(staker.underlyingNFT(), address(nft), "Incorrect underlyingNFT address");
        staker.underlyingNFT();
    }
}
