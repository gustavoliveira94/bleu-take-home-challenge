// __tests__/transactions.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Transactions } from '../transactions';

describe('<Transactions />', () => {
  const mockTransactions = {
    mints: [
      ['1', '0xOwner1', '2024-01-01'],
      ['2', '0xOwner2', '2024-01-02'],
    ],
    stakes: [['3', '0xStaker1', '2024-02-01']],
    unstake: [['4', '0xUnstaker1', '2024-03-01']],
  };

  it('renders all 3 transaction sections with correct headers and data', () => {
    render(<Transactions transactions={mockTransactions} />);

    // Headers
    expect(screen.getByText('MINTS')).toBeInTheDocument();
    expect(screen.getByText('STAKES')).toBeInTheDocument();
    expect(screen.getByText('UNSTAKES')).toBeInTheDocument();

    // Mint data
    expect(screen.getByText('0xOwner1')).toBeInTheDocument();
    expect(screen.getByText('0xOwner2')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('2024-01-02')).toBeInTheDocument();

    // Stake data
    expect(screen.getByText('0xStaker1')).toBeInTheDocument();
    expect(screen.getByText('2024-02-01')).toBeInTheDocument();

    // Unstake data
    expect(screen.getByText('0xUnstaker1')).toBeInTheDocument();
    expect(screen.getByText('2024-03-01')).toBeInTheDocument();
  });

  it('renders empty tables when no data is provided', () => {
    render(<Transactions transactions={{ mints: [], stakes: [], unstake: [] }} />);

    // Still shows section headers
    expect(screen.getByText('MINTS')).toBeInTheDocument();
    expect(screen.getByText('STAKES')).toBeInTheDocument();
    expect(screen.getByText('UNSTAKES')).toBeInTheDocument();

    // No rows found
    expect(screen.queryByText('0xOwner1')).not.toBeInTheDocument();
    expect(screen.queryByText('2024-01-01')).not.toBeInTheDocument();
  });
});
