'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, Sparkles } from 'lucide-react';
import EntropyOrb from '@/app/components/shared/entropy-orb';
import { type AssignEntropyPurityOutput, assignEntropyPurity } from '@/ai/flows/assign-entropy-purity';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

function generateHash(length: number) {
  return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

export default function MintClient() {
  const [isMinting, setIsMinting] = useState(false);
  const [mintedSeed, setMintedSeed] = useState<AssignEntropyPurityOutput & { id: string, hash: string } | null>(null);
  const { toast } = useToast();

  const handleGenerateSeed = async () => {
    setIsMinting(true);
    setMintedSeed(null);
    try {
      const seedId = Math.random().toString(36).substring(2, 10);
      const result = await assignEntropyPurity({ seedId });
      setMintedSeed({ 
        ...result,
        id: seedId,
        hash: '0x' + generateHash(64)
      });
    } catch (error) {
      console.error('Error generating seed:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Seed',
        description: 'Could not connect to the randomness oracle. Please try again.',
      });
    } finally {
      setIsMinting(false);
    }
  };
  
  const handleMint = () => {
    toast({
      title: 'Mint Successful (Mock)',
      description: `Seed #${mintedSeed?.id} has been added to your wallet.`,
    });
  }

  return (
    <div className="mt-12 flex flex-col items-center">
      {!mintedSeed && (
        <Button
          size="lg"
          className="font-headline text-lg"
          onClick={handleGenerateSeed}
          disabled={isMinting}
        >
          {isMinting ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              Calculating Entropy...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Random Seed
            </>
          )}
        </Button>
      )}

      {mintedSeed && (
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="flex flex-col items-center justify-center">
            <EntropyOrb purity={mintedSeed.entropyPurity} className="scale-125" />
          </div>
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle className="font-headline text-3xl flex justify-between items-center">
                <span>Seed #{mintedSeed.id}</span>
                <Badge variant="secondary" className="text-base bg-primary/20 text-primary">{mintedSeed.entropyPurity}% Purity</Badge>
              </CardTitle>
              <CardDescription>
                A new vessel of chaos has been forged.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-headline text-sm text-muted-foreground">Seed Hash</h4>
                <p className="font-mono text-xs break-all text-foreground/80">{mintedSeed.hash}</p>
              </div>
              <div>
                <h4 className="font-headline text-sm text-muted-foreground">Randomness Signature</h4>
                <svg viewBox="0 0 100 100" className="w-full h-24 bg-background/50 rounded-md mt-1 p-2">
                  <path d={mintedSeed.randomnessSignature} stroke="hsl(var(--accent))" fill="none" strokeWidth="2" />
                </svg>
              </div>
              <Separator />
              <div className="flex gap-4">
                <Button size="lg" className="w-full font-headline" onClick={handleMint}>
                  Mint Seed
                </Button>
                 <Button size="lg" variant="outline" className="w-full font-headline" onClick={handleGenerateSeed} disabled={isMinting}>
                  {isMinting ? <Loader className="animate-spin" /> : 'Generate Another'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
