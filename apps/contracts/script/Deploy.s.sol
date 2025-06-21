// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {BleuNFT} from "../src/BleuNFT.sol";
import {BleuNFTStaker} from "../src/BleuNFTStaker.sol";
import {BleuNFTRewards} from "../src/BleuNFTRewards.sol";

contract Deploy is Script {
    BleuNFT public nft;
    BleuNFTStaker public staker;
    BleuNFTRewards public rewards;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        nft = new BleuNFT();
        rewards = new BleuNFTRewards();
        staker = new BleuNFTStaker(address(nft), address(rewards));

        console.log("NFT address:", address(nft));
        console.log("Staker address:", address(staker));

        vm.stopBroadcast();
    }
}
