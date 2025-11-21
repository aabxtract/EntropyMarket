'use client';

import { generateRandomDrop, type GenerateRandomDropOutput } from '@/ai/flows/generate-random-drop';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { type Seed } from '@/lib/types';
import { Flame, Loader2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { placeholderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

export default function DropClient({ seed }: { seed: Seed }) {
  const [isBurning, setIsBurning] = useState(false);
  const [drop, setDrop] = useState<GenerateRandomDropOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleBurn = async () => {
    setIsBurning(true);
    setError(null);
    setDrop(null);

    try {
      const result = await generateRandomDrop({
        seedId: seed.id,
        entropyPurity: seed.purity,
      });
      // Simulate delay for animation
      setTimeout(() => {
        setDrop(result);
        toast({
          title: "Drop Revealed!",
          description: `You received: ${result.dropDescription}`,
        });
      }, 2000);
    } catch (e) {
      setError('Failed to generate drop. The oracle is silent.');
      setIsBurning(false);
    }
  };
  
  // Auto-burn on page load
  useEffect(() => {
    handleBurn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropImage = placeholderImages.find(p => p.id === 'quantum-shard'); // Example, can be made dynamic

  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        {!drop && (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-primary/50 rounded-lg h-96">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <h2 className="mt-6 font-headline text-2xl">Transmuting Entropy...</h2>
            <p className="text-muted-foreground mt-2">Please wait while your seed is burned.</p>
          </div>
        )}
        
        {drop && (
          <Card className="glassmorphism animate-in fade-in zoom-in-95 duration-500">
            <CardHeader className="items-center text-center">
              <Sparkles className="w-12 h-12 text-amber-400" />
              <CardTitle className="font-headline text-3xl mt-4">Drop Revealed!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              {dropImage && (
                <Image
                  src={dropImage.imageUrl}
                  alt={drop.dropDescription}
                  width={200}
                  height={200}
                  data-ai-hint={dropImage.imageHint}
                  className="rounded-lg shadow-2xl shadow-primary/30 mb-6"
                />
              )}
               <Badge 
                className={`text-base font-bold mb-2 ${
                  drop.rarity === 'Rare' ? 'bg-purple-500' : 
                  drop.rarity === 'Legendary' ? 'bg-amber-500' : 'bg-secondary'
                }`}
              >
                {drop.rarity}
              </Badge>
              <h3 className="font-headline text-xl font-semibold">{drop.dropType}</h3>
              <p className="text-muted-foreground mt-1">{drop.dropDescription}</p>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button asChild size="lg" className="w-full font-headline">
                <Link href="/profile" prefetch={true}>View in My Collection</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full font-headline">
                <Link href="/market" prefetch={true}>Back to Market</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
