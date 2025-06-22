export const queryMint = `
    query Mint {
        mints {
          items {
            owner
            tokenId
            timestamp
          }
        }
    }
`;

export const queryMintByUserCount = `
    query Mint($owner: String!) {
        mints(where: { owner: $owner }) {
          totalCount
        }
    }
`;
