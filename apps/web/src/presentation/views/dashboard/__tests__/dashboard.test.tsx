import React from 'react';
import { render, screen } from '@testing-library/react';

import { Dashboard } from '../dashboard';

// Mock the useUserInformations hook
jest.mock('@/core/hooks/use-user-informations', () => ({
  useUserInformations: jest.fn(),
}));

// Mock the NFTs component as a simple wrapper that renders children with mocked data
jest.mock('@/presentation/components/nfts/nfts', () => ({
  NFTs: ({ children }: { children: Function }) => {
    // Provide mocked NFT data
    const mockNFTs = [
      {
        id: 1,
        collection: 'A',
        image: 'img1.png',
        name: 'NFT1',
        status: 'Mint',
        rarity: 'Common',
        owner: 'You',
      },
      {
        id: 2,
        collection: 'B',
        image: 'img2.png',
        name: 'NFT2',
        status: 'Mint',
        rarity: 'Rare',
        owner: 'Other',
      },
    ];
    return <>{children({ nfts: mockNFTs })}</>;
  },
}));

// Mock the NFT component to just render the name for simplicity
jest.mock('@/presentation/components/nft/nft', () => ({
  NFT: ({ name }: { name: string }) => <div data-testid="nft-item">{name}</div>,
}));

describe('<Dashboard />', () => {
  beforeEach(() => {
    const { useUserInformations } = require('@/core/hooks/use-user-informations');
    useUserInformations.mockReturnValue({
      totalStaked: 5,
      totalNFTs: 10,
      totalRewards: 123.45,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information correctly', () => {
    render(<Dashboard />);

    expect(screen.getByText(/Total NFTs: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Total NFTs Staked: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Rewards: 123.45/i)).toBeInTheDocument();
  });

  it('renders only NFTs owned by "You"', () => {
    render(<Dashboard />);

    const nftItems = screen.getAllByTestId('nft-item');

    // Should render only one NFT, because only one has owner 'You'
    expect(nftItems).toHaveLength(1);
    expect(nftItems[0]).toHaveTextContent('NFT1');
  });
});
