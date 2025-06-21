export const queryStake = `
    query Stake{
        stakes {
          items {
            owner
            tokenId
            active
          }
        }
    }
`;

export const queryStakeByUserTotalCount = `
    query StakeByUser($owner: String!) {
        stakes(where: { owner: $owner, active: true }) {
            totalCount
        }
    }
`;

export const queryAllStake = `
    query AllStake {
        allStakes {
          items {
            id
            owner
            tokenId
          }
        }
    }
`;
