import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ParticleBackground from '../components/shared/particle-background';
import PageHeader from '../components/shared/page-header';

export default function AboutPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <ParticleBackground />
      <div className="container relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <PageHeader
            title="Trade Chaos. Own Entropy."
            subtitle="Welcome to the decentralized marketplace for randomness."
          />
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild size="lg" className="font-headline">
              <Link href="/market" prefetch={true}>
                Enter the Market <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-headline">
              <Link href="/mint" prefetch={true}>Mint a Seed</Link>
            </Button>
          </div>
          <Card className="glassmorphism mt-16 max-w-2xl text-left">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">What is Entropy?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                In the Entropy Market, randomness is a tangible asset. We capture and tokenize pure, verifiable entropy into unique digital assets called Entropy Seeds. Each seed is an NFT with a distinct 'Purity' score, representing the quality of its randomness.
              </p>
              <p className="mt-4 text-foreground/80">
                You can mint new seeds, trade them with others, or 'burn' them to generate unpredictable and potentially rare digital drops. The higher the purity, the greater the potential.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
