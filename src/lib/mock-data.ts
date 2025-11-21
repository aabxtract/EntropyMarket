import type { Seed, Drop, Transaction } from '@/lib/types';
import { placeholderImages } from './placeholder-images';

function generateRandomWaveform() {
  let d = 'M0,50';
  for (let i = 1; i <= 10; i++) {
    const x = i * 10;
    const y = 20 + Math.random() * 60;
    d += ` L${x},${y}`;
  }
  return d;
}

function generateHash(length: number) {
  return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

export const mockSeeds: Seed[] = [
  {
    id: '1',
    purity: 98,
    hash: '0x' + generateHash(64),
    signature: generateRandomWaveform(),
    noisePattern: 'Quantum Fluctuation',
    utilityLevel: 5,
    price: 1.5,
    owner: '0x123...abc',
    mintedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    purity: 75,
    hash: '0x' + generateHash(64),
    signature: generateRandomWaveform(),
    noisePattern: 'Static Hum',
    utilityLevel: 3,
    price: 0.4,
    owner: '0x456...def',
    mintedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '3',
    purity: 23,
    hash: '0x' + generateHash(64),
    signature: generateRandomWaveform(),
    noisePattern: 'Cosmic Microwave',
    utilityLevel: 1,
    price: 0.05,
    owner: '0x789...ghi',
    mintedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '4',
    purity: 88,
    hash: '0x' + generateHash(64),
    signature: generateRandomWaveform(),
    noisePattern: 'Quantum Fluctuation',
    utilityLevel: 4,
    price: 0.9,
    owner: '0x123...abc',
    mintedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '5',
    purity: 51,
    hash: '0x' + generateHash(64),
    signature: generateRandomWaveform(),
    noisePattern: 'Static Hum',
    utilityLevel: 2,
    owner: '0xabc...123',
    mintedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: '6',
    purity: 99,
    hash: '0x' + generateHash(64),
    signature: generateRandomWaveform(),
    noisePattern: 'Pure Chaos',
    utilityLevel: 5,
    price: 3.2,
    owner: '0xdef...456',
    mintedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
];

const quantumShard = placeholderImages.find(img => img.id === 'quantum-shard');

export const mockDrops: Drop[] = [
  {
    type: 'Rare artifact',
    description: 'A shimmering quantum shard, resonating with pure entropy.',
    rarity: 'Rare',
    seedId: '1',
    image: {
      url: quantumShard?.imageUrl || '',
      hint: quantumShard?.imageHint || 'glowing crystal',
    }
  },
  {
    type: 'Special Badge',
    description: 'Badge of the First Burner. A mark of distinction.',
    rarity: 'Uncommon',
    seedId: '4',
    image: {
      url: 'https://picsum.photos/seed/badge/600/600',
      hint: 'futuristic badge',
    }
  },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', type: 'Burn', seedId: '1', from: '0x123...abc', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
  { id: 't2', type: 'Buy', seedId: '2', from: '0x456...def', to: '0x123...abc', price: 0.4, timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: 't3', type: 'Mint', seedId: '4', to: '0x123...abc', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: 't4', type: 'Sell', seedId: '3', from: '0x789...ghi', price: 0.05, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString() },
];

export const mockUser = {
  walletId: '0x123...abc',
  randomnessScore: mockSeeds
    .filter(s => s.owner === '0x123...abc')
    .reduce((acc, seed) => acc + seed.purity, 0),
};
