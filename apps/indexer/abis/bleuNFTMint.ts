export const bleuNFTMint = [
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        { "name": "owner", "type": "address", "indexed": true },
        { "name": "approved", "type": "address", "indexed": true },
        { "name": "tokenId", "type": "uint256", "indexed": true }
      ]
    },
    {
      "type": "event",
      "name": "ApprovalForAll",
      "inputs": [
        { "name": "owner", "type": "address", "indexed": true },
        { "name": "operator", "type": "address", "indexed": true },
        { "name": "approved", "type": "bool", "indexed": false, "internalType": "bool" }
      ]
    },
    {
      "type": "event",
      "name": "Mint",
      "inputs": [
        { "name": "to", "type": "address", "indexed": true },
        { "name": "tokenId", "type": "uint256", "indexed": true }
      ]
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        { "name": "from", "type": "address", "indexed": true },
        { "name": "to", "type": "address", "indexed": true },
        { "name": "tokenId", "type": "uint256", "indexed": true }
      ]
    },
    {
      "type": "error",
      "name": "ERC721IncorrectOwner",
      "inputs": [
        { "name": "sender", "type": "address" },
        { "name": "tokenId", "type": "uint256" },
        { "name": "owner", "type": "address" }
      ]
    },
    {
      "type": "error",
      "name": "ERC721InsufficientApproval",
      "inputs": [
        { "name": "operator", "type": "address" },
        { "name": "tokenId", "type": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "ERC721InvalidApprover",
      "inputs": [{ "name": "approver", "type": "address" }]
    },
    {
      "type": "error",
      "name": "ERC721InvalidOperator",
      "inputs": [{ "name": "operator", "type": "address" }]
    },
    {
      "type": "error",
      "name": "ERC721InvalidOwner",
      "inputs": [{ "name": "owner", "type": "address" }]
    },
    {
      "type": "error",
      "name": "ERC721InvalidReceiver",
      "inputs": [{ "name": "receiver", "type": "address" }]
    },
    {
      "type": "error",
      "name": "ERC721InvalidSender",
      "inputs": [{ "name": "sender", "type": "address" }]
    },
    {
      "type": "error",
      "name": "ERC721NonexistentToken",
      "inputs": [{ "name": "tokenId", "type": "uint256" }]
    }
  ] as const
