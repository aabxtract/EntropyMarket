'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Waves } from 'lucide-react';

const navLinks = [
  { href: '/mint', label: 'Mint' },
  { href: '/market', label: 'Market' },
  { href: '/profile', label: 'Profile' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" prefetch={true} className="flex items-center gap-2">
          <Waves className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-bold tracking-tighter">
            Entropy Market
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className={cn(
                'font-headline transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="font-headline border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}
