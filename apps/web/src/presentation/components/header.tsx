'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Moon, Menu, X } from 'lucide-react';

import { useThemeStore } from '@/core/store/useThemeStore';
import { ConnectWalletButton } from './connect-wallet-button';
import NavLink from './nav-link';
import { Button } from './ui/button';

const Header = () => {
  const { toggleTheme } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-content rounded-3xl mx-auto mt-6 px-5 max-w-[1300px] h-16 flex items-center justify-between mx-5">
      <Link href="/">
        <h1 className="text-primary font-bold text-lg font-roboto-mono text-center">Bleu</h1>
      </Link>

      {/* Desktop navigation */}
      <nav className="hidden lg:flex gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/transactions">Transactions</NavLink>
      </nav>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-2 hidden md:flex">
        <ConnectWalletButton />
        <Button
          variant="ghost"
          className="rounded-full bg-primary/10 p-1 w-8 h-8"
          onClick={toggleTheme}
        >
          <Moon size={18} className="text-primary" />
        </Button>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-background border-t border-border shadow-md flex flex-col items-center py-4 space-y-2">
          <div className="flex items-center gap-2">
            <ConnectWalletButton />
            <Button
              variant="ghost"
              className="rounded-full bg-primary/10 p-1 w-8 h-8"
              onClick={toggleTheme}
            >
              <Moon size={18} className="text-primary" />
            </Button>
          </div>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/transactions">Transactions</NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
