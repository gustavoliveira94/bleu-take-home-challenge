import React from 'react';
import { render, screen } from '@testing-library/react';

import { Transactions } from '../transactions';

// Mocking useTransactions hook
jest.mock('@/core/hooks/use-transactions', () => ({
  useTransactions: jest.fn(),
}));

describe('<Transactions />', () => {
  const useTransactionsMock = require('@/core/hooks/use-transactions').useTransactions;

  beforeEach(() => {
    useTransactionsMock.mockReturnValue({
      mints: [
        ['1', '0xOwner1', '2024-01-01'],
        ['2', '0xOwner2', '2024-01-02'],
      ],
      stakes: [],
      unstake: [],
      loadingMints: false,
      loadingStakes: false,
      loadingUnstake: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders mints, stakes, and unstakes sections', () => {
    render(<Transactions />);

    // Check section headers
    expect(screen.getByText(/MINTS/i)).toBeInTheDocument();
    expect(screen.getByText('STAKES')).toBeInTheDocument();
    expect(screen.getByText('UNSTAKES')).toBeInTheDocument();

    // Check that mocked tables are rendered
    const tables = screen.getAllByTestId('table');
    expect(tables).toHaveLength(3);

    // Check content of the mint table
    expect(screen.getByText('0xOwner1')).toBeInTheDocument();
    expect(screen.getByText('2024-01-02')).toBeInTheDocument();
    expect(screen.getByText('0xOwner1')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  it('shows loading state for all tables', () => {
    useTransactionsMock.mockReturnValue({
      mints: [],
      stakes: [],
      unstake: [],
      loadingMints: true,
      loadingStakes: true,
      loadingUnstake: true,
    });

    render(<Transactions />);

    const loadingTexts = screen.getAllByTestId('loading');
    expect(loadingTexts).toHaveLength(3);
  });
});
