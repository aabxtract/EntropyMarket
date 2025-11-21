import { notFound } from 'next/navigation';
import { mockSeeds } from '@/lib/mock-data';
import PageHeader from '@/app/components/shared/page-header';
import EntropyOrb from '@/app/components/shared/entropy-orb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Flame, ShoppingCart, Tag, Waves } from 'lucide-react';
import Link from 'next/link';

export default function SeedDetailsPage({ params }: { params: { id: string } }) {
  const seed = mockSeeds.find((s) => s.id === params.id);

  if (!seed) {
    notFound();
  }

  return (
    <div className="container py-12">
      <PageHeader
        title={`Entropy Seed #${seed.id}`}
        subtitle="A unique vessel of pure randomness, ready for trade or transmutation."
      />
      <div className="mt-12 grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2 flex items-center justify-center">
          <div className="w-full h-full min-h-64 flex items-center justify-center">
            <EntropyOrb purity={seed.purity} className="scale-[2]" />
          </div>
        </div>

        <div className="md:col-span-3">
          <Card className="glassmorphism h-full">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Seed Attributes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground font-headline">Purity</span>
                  <Badge className="w-fit text-lg font-bold bg-primary/20 text-primary border-primary/30">{seed.purity}%</Badge>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground font-headline">Price</span>
                  <span className="font-bold text-accent flex items-center gap-1.5"><Waves className="w-5 h-5"/>{seed.price ? `${seed.price} ETH` : 'Not for Sale'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground font-headline">Noise Pattern</span>
                  <span className="font-semibold">{seed.noisePattern}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground font-headline">Utility Level</span>
                  <span className="font-semibold">{seed.utilityLevel}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-sm text-muted-foreground font-headline">Seed Hash</span>
                <p className="font-mono text-xs break-all text-foreground/80">{seed.hash}</p>
              </div>

               <div className="space-y-1">
                <span className="text-sm text-muted-foreground font-headline">Randomness Signature</span>
                <svg viewBox="0 0 100 100" className="w-full h-24 bg-background/50 rounded-md mt-1 p-2">
                  <path d={seed.signature} stroke="hsl(var(--accent))" fill="none" strokeWidth="2" />
                </svg>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button size="lg" className="w-full font-headline">
                  <ShoppingCart className="mr-2"/> Buy Now
                </Button>
                <Button size="lg" variant="secondary" className="w-full font-headline">
                   <Tag className="mr-2"/> Make Offer
                </Button>
                 <Button asChild size="lg" variant="destructive" className="w-full font-headline bg-amber-600 hover:bg-amber-700 text-white">
                  <Link href={`/drop/${seed.id}`}>
                    <Flame className="mr-2"/> Burn for Drop
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
