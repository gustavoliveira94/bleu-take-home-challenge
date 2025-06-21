export interface INFT {
  id: number;
  name: string;
  collection: string;
  image: string;
  rarity: string;
  status: 'Staked' | 'Mint' | 'Minted';
  owner: string | 'You';
}
