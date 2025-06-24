import { render, screen, fireEvent } from '@testing-library/react';
import { NFT } from '../nft';
import type { INFT } from '@/core/interfaces/nft';
import { nftMockList } from '@/core/utils/mock-nfts';

let statusAccount: 'connected' | 'disconnected' = 'connected';
let mockSetOpen = jest.fn();

jest.mock('wagmi', () => ({
  useAccount: () => ({
    status: statusAccount,
  }),
}));

jest.mock('connectkit', () => ({
  useModal: () => ({
    setOpen: mockSetOpen,
  }),
}));

const mockAction = jest.fn();
jest.mock('../hooks/use-nft', () => ({
  useNFT: () => ({
    actions: {
      action: mockAction,
      label: 'Mint',
    },
  }),
}));

describe('<NFT />', () => {
  let mockNFT: INFT;

  beforeEach(() => {
    statusAccount = 'connected';
    mockNFT = {
      ...nftMockList[0],
      owner: 'You',
      status: 'Mint',
    };
    jest.clearAllMocks();
  });

  it('renders NFT details correctly', () => {
    render(<NFT {...mockNFT} />);

    expect(screen.getByText(`#${mockNFT.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockNFT.name)).toBeInTheDocument();
    expect(screen.getByText(mockNFT.collection)).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getAllByText('Mint')?.[0]).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders action button when status is Mint and owner is You', () => {
    render(<NFT {...mockNFT} />);
    expect(screen.getByRole('button', { name: /Mint/i })).toBeInTheDocument();
  });

  it('calls action function when connected and button is clicked', () => {
    render(<NFT {...mockNFT} />);
    fireEvent.click(screen.getByRole('button', { name: /Mint/i }));
    expect(mockAction).toHaveBeenCalledWith({ tokenId: mockNFT.id });
  });

  it('calls connect modal when disconnected and button clicked', () => {
    statusAccount = 'disconnected';
    render(<NFT {...mockNFT} />);

    fireEvent.click(screen.getByRole('button', { name: /Mint/i }));
    expect(mockSetOpen).toHaveBeenCalledWith(true);
    expect(mockAction).not.toHaveBeenCalled();
  });

  it('does not render action button if status is not Mint or owner is not You', () => {
    render(<NFT {...{ ...mockNFT, status: 'Staked', owner: '0x123' }} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
