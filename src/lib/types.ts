export interface Seed {
  id: string;
  purity: number;
  hash: string;
  signature: string; // SVG path data for the waveform
  noisePattern: string;
  utilityLevel: number;
  price?: number;
  owner?: string;
  mintedAt: string;
}

export interface Drop {
  type: string;
  description: string;
  rarity: string;
  seedId: string;
  image: {
    url: string;
    hint: string;
  };
}

export interface Transaction {
  id:string;
  type: 'Mint' | 'Buy' | 'Sell' | 'Burn';
  seedId: string;
  from?: string;
  to?: string;
  price?: number;
  timestamp: string;
}
