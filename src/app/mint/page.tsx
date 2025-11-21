import PageHeader from '../components/shared/page-header';
import MintClient from './components/mint-client';

export default function MintPage() {
  return (
    <div className="container py-12">
      <PageHeader
        title="Mint Entropy Seed"
        subtitle="Generate a new, unique Entropy Seed NFT. Each seed is a vessel of pure, verifiable randomness."
      />
      <MintClient />
    </div>
  );
}
