interface IFormatAddress {
  address: string;
}

export const formatAddress = ({ address }: IFormatAddress) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
