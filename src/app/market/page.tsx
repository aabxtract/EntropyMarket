import PageHeader from "../components/shared/page-header";
import { mockSeeds } from "@/lib/mock-data";
import MarketClient from "./components/market-client";

export default function MarketPage() {
  // In a real app, you would fetch this data from an API or smart contract
  const seeds = mockSeeds;

  return (
    <div className="container py-12">
      <PageHeader
        title="The Entropy Market"
        subtitle="Browse, filter, and trade unique Entropy Seeds. Each seed is a key to unlock new possibilities."
      />
      <MarketClient initialSeeds={seeds} />
    </div>
  );
}
