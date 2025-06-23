import { screen, fireEvent, render } from '@testing-library/react';

// import { render } from '@/configs/tests/helper';

import { NFT } from '../nft';
import type { INFT } from '@/core/interfaces/nft';
import { nftMockList } from '@/core/utils/mock-nfts';

let statusAccount = 'connected';

// Mock useAccount from wagmi
jest.mock('wagmi', () => ({
  useAccount: () => ({
    status: statusAccount,
  }),
}));

// Mock useNFT hook
const mockAction = jest.fn();
jest.mock('../hooks/use-nft', () => ({
  useNFT: () => ({
    actions: {
      action: mockAction,
      label: 'Mint',
    },
  }),
}));

let owner = 'You';
let status = 'Staked';

const mockNFT = { ...nftMockList[0], owner, status } as INFT;

describe('<NFT />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders NFT details correctly', () => {
    render(<NFT {...mockNFT} />);

    expect(screen.getByText(/#1/)).toBeInTheDocument();
    expect(screen.getByText(/Rick and Morty/)).toBeInTheDocument();
    expect(screen.getByText(/You/)).toBeInTheDocument();
    expect(screen.getByText(/Mint/)).toBeInTheDocument();
    expect(screen.getByText(/Staked/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Frickandmortyapi.com%2Fapi%2Fcharacter%2Favatar%2F1.jpeg&w=640&q=100'
    );
  });

  it('renders action button when available', () => {
    render(<NFT {...mockNFT} />);
    expect(screen.getByRole('button', { name: /Mint/i })).toBeInTheDocument();
  });

  it('calls action function when button is clicked', () => {
    render(<NFT {...mockNFT} />);
    const button = screen.getByRole('button', { name: /Mint/i });

    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalledWith({ tokenId: 1 });
  });

  it('does not render button if status is not connected', () => {
    statusAccount = 'disconnected';

    render(<NFT {...mockNFT} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not render button if owner is another address', () => {
    owner = '0x';

    render(<NFT {...mockNFT} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
