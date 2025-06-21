export const bleuNFTStake = [
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        { "name": "owner", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "approved", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ApprovalForAll",
      "inputs": [
        { "name": "owner", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "operator", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "approved", "type": "bool", "indexed": false, "internalType": "bool" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Stake",
      "inputs": [
        { "name": "to", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        { "name": "from", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "to", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Unstake",
      "inputs": [
        { "name": "to", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "ERC721IncorrectOwner",
      "inputs": [
        { "name": "sender", "type": "address", "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
        { "name": "owner", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "ERC721InsufficientApproval",
      "inputs": [
        { "name": "operator", "type": "address", "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "ERC721InvalidApprover",
      "inputs": [{ "name": "approver", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "ERC721InvalidOperator",
      "inputs": [{ "name": "operator", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "ERC721InvalidOwner",
      "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "ERC721InvalidReceiver",
      "inputs": [{ "name": "receiver", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "ERC721InvalidSender",
      "inputs": [{ "name": "sender", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "ERC721NonexistentToken",
      "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }]
    }
  ] as const
