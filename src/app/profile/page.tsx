import PageHeader from "../components/shared/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUser, mockSeeds, mockDrops, mockTransactions } from "@/lib/mock-data";
import SeedCard from "../components/shared/seed-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export default function ProfilePage() {
  const userSeeds = mockSeeds.filter(s => s.owner === mockUser.walletId);
  const userDrops = mockDrops; // Mock: show all drops for demo
  const userTransactions = mockTransactions;

  return (
    <div className="container py-12">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <PageHeader
          title="My Collection"
          subtitle={`Wallet: ${mockUser.walletId}`}
        />
        <div className="text-center sm:text-right">
          <p className="text-sm text-muted-foreground font-headline">Total Randomness Score</p>
          <p className="font-headline text-4xl font-bold text-primary">{mockUser.randomnessScore}</p>
        </div>
      </div>

      <Tabs defaultValue="seeds" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto font-headline">
          <TabsTrigger value="seeds">My Seeds</TabsTrigger>
          <TabsTrigger value="drops">My Drops</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="seeds" className="mt-6">
          {userSeeds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userSeeds.map((seed) => (
                <SeedCard key={seed.id} seed={seed} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">You don't own any seeds yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="drops" className="mt-6">
           {userDrops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userDrops.map((drop, index) => (
                <Card key={index} className="glassmorphism">
                  <CardHeader>
                    {drop.image && (
                       <Image
                        src={drop.image.url}
                        alt={drop.description}
                        width={300}
                        height={300}
                        data-ai-hint={drop.image.hint}
                        className="rounded-lg aspect-square object-cover"
                      />
                    )}
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="mb-2">{drop.rarity}</Badge>
                    <h3 className="font-headline font-semibold">{drop.type}</h3>
                    <p className="text-sm text-muted-foreground">{drop.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">You haven't revealed any drops.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle className="font-headline">Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Seed ID</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTransactions.map(tx => (
                    <TableRow key={tx.id}>
                      <TableCell><Badge variant={tx.type === 'Burn' ? 'destructive' : 'secondary'}>{tx.type}</Badge></TableCell>
                      <TableCell className="font-mono text-xs">#{tx.seedId}</TableCell>
                      <TableCell>{tx.price ? `${tx.price} ETH` : '--'}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-xs">{formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
