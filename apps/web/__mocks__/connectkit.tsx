import React from 'react';

export const ConnectKitProvider = ({ children }: { children: React.ReactNode }) => children;

export const ConnectKitButton = {
  Custom: () => <button>Connect Wallet</button>,
};

export const useModal = () => ({
  setOpen: jest.fn(),
});
