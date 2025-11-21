'use client';

import { useState, useMemo } from 'react';
import type { Seed } from '@/lib/types';
import SeedCard from '@/app/components/shared/seed-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SortOption = 'newest' | 'price-high' | 'price-low' | 'purity-high' | 'purity-low';
type PurityFilter = 'all' | 'high' | 'medium' | 'low';

export default function MarketClient({ initialSeeds }: { initialSeeds: Seed[] }) {
  const [sort, setSort] = useState<SortOption>('newest');
  const [purityFilter, setPurityFilter] = useState<PurityFilter>('all');

  const filteredAndSortedSeeds = useMemo(() => {
    let seeds = [...initialSeeds];

    // Filter by purity
    seeds = seeds.filter(seed => {
      if (purityFilter === 'high') return seed.purity >= 80;
      if (purityFilter === 'medium') return seed.purity >= 40 && seed.purity < 80;
      if (purityFilter === 'low') return seed.purity < 40;
      return true;
    });

    // Sort
    seeds.sort((a, b) => {
      switch (sort) {
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'purity-high':
          return b.purity - a.purity;
        case 'purity-low':
          return a.purity - b.purity;
        case 'newest':
        default:
          return new Date(b.mintedAt).getTime() - new Date(a.mintedAt).getTime();
      }
    });

    return seeds;
  }, [initialSeeds, sort, purityFilter]);

  return (
    <>
      <div className="mt-8 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center p-4 rounded-lg glassmorphism">
        <div className="flex gap-4 items-center">
          <span className="font-headline text-sm text-muted-foreground">Filter by Purity:</span>
          <Select onValueChange={(value) => setPurityFilter(value as PurityFilter)} defaultValue="all">
            <SelectTrigger className="w-[180px] font-headline">
              <SelectValue placeholder="All Purities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Purities</SelectItem>
              <SelectItem value="high">High (80% +)</SelectItem>
              <SelectItem value="medium">Medium (40-79%)</SelectItem>
              <SelectItem value="low">Low (&lt; 40%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-headline text-sm text-muted-foreground">Sort by:</span>
          <Select onValueChange={(value) => setSort(value as SortOption)} defaultValue="newest">
            <SelectTrigger className="w-[180px] font-headline">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newly Minted</SelectItem>
              <SelectItem value="purity-high">Purity: High to Low</SelectItem>
              <SelectItem value="purity-low">Purity: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSortedSeeds.map((seed) => (
          <SeedCard key={seed.id} seed={seed} />
        ))}
      </div>
    </>
  );
}
