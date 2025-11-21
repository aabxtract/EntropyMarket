import { notFound } from 'next/navigation';
import { mockSeeds } from '@/lib/mock-data';
import PageHeader from '@/app/components/shared/page-header';
import DropClient from './components/drop-client';

export default function DropPage({ params }: { params: { id: string } }) {
  const seed = mockSeeds.find((s) => s.id === params.id);

  if (!seed) {
    notFound();
  }

  return (
    <div className="container py-12">
      <PageHeader
        title="Burning Entropy Seed"
        subtitle={`Transmuting Seed #${seed.id} to reveal a random drop.`}
      />
      <DropClient seed={seed} />
    </div>
  );
}
