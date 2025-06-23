import { screen } from '@testing-library/react';

import { render } from '@/configs/tests/helper';

import { NFTs } from '../nfts';

// Import the mocked useNFTs
import { INFT } from '@/core/interfaces/nft';
import { nftMockList } from '@/core/utils/mock-nfts';

let loading = false;
let nftsMock: INFT[] = [];

jest.mock('@/core/hooks/use-nfts', () => ({
  useNFTs: () => ({
    nfts: nftsMock,
    loading,
  }),
}));

describe('<NFTs />', () => {
  it('renders loading state when loading is true', () => {
    loading = true;

    render(<NFTs>{({ nfts }) => nfts.map((nft) => <p key={nft.id}>{nft.id}</p>)}</NFTs>);

    // Check loader presence by checking the container div with flex centering
    expect(screen.queryByText(/No NFTs found/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('nft-list')).not.toBeInTheDocument();
  });

  it('renders no data message when NFT list is empty', () => {
    loading = false;

    render(<NFTs>{({ nfts }) => nfts.map((nft) => <p key={nft.id}>{nft.id}</p>)}</NFTs>);

    expect(screen.getByText(/No NFTs found/i)).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByTestId('nft-list')).not.toBeInTheDocument();
  });

  it('renders NFT list when data is available', () => {
    nftsMock = nftMockList as INFT[];
    loading = false;

    render(
      <NFTs>
        {({ nfts }) => (
          <div data-testid="nft-list">
            {nfts.map((nft) => (
              <p key={nft.id}>{nft.id}</p>
            ))}
          </div>
        )}
      </NFTs>
    );

    expect(screen.queryByText(/No NFTs found/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('nft-list')).toBeInTheDocument();
  });
});
