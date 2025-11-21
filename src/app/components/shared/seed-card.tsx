import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Seed } from '@/lib/types';
import Link from 'next/link';
import EntropyOrb from './entropy-orb';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Waves } from 'lucide-react';

type SeedCardProps = {
  seed: Seed;
  className?: string;
};

export default function SeedCard({ seed, className }: SeedCardProps) {
  return (
    <Card className={cn('glassmorphism group relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20', className)}>
      <Link href={`/seed/${seed.id}`} prefetch={true} className="block">
        <CardHeader className="p-4">
          <div className="h-32 flex items-center justify-center">
            <EntropyOrb purity={seed.purity} className="scale-75" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex justify-between items-baseline">
            <h3 className="font-headline text-lg font-bold">Seed #{seed.id}</h3>
            <div className="flex items-center gap-1 text-sm font-bold text-accent">
              <span>{seed.purity}%</span>
              <span>Purity</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            Hash: {seed.hash}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="font-headline text-xl font-bold text-primary flex items-center">
           <Waves className="w-4 h-4 mr-1"/> {seed.price ? `${seed.price} ETH` : 'Not for Sale'}
        </div>
        <Button asChild variant="secondary" size="sm" className="font-headline">
          <Link href={`/seed/${seed.id}`} prefetch={true}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
