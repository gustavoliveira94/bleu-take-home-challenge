interface IFormatTimestamp {
  timestamp: number;
}

export const formatTimestamp = ({ timestamp }: IFormatTimestamp) => {
  return new Date(timestamp * 1000).toISOString().slice(0, 10);
};
