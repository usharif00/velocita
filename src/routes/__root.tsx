import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sparkles, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { ManageDialog } from '@/components/manage-dialog';
export function RootLayout() {
  return (
    <div className="min-h-screen bg-obsidian text-silver selection:bg-gold/30 selection:text-gold">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-obsidian/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center group-hover:scale-110 transition-transform shadow-gold">
              <Sparkles className="w-6 h-6 text-obsidian" />
            </div>
            <span className="text-2xl font-serif font-bold text-white tracking-tight">Velocita</span>
          </Link>
          <div className="flex items-center gap-4">
            <ManageDialog>
              <Button className="bg-gold hover:bg-gold/90 text-obsidian font-semibold rounded-full px-6 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Vehicle
              </Button>
            </ManageDialog>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <Outlet />
      </main>
      <footer className="border-t border-white/5 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Velocita Automotive. All rights reserved.</p>
        </div>
      </footer>
      <Toaster position="top-center" theme="dark" richColors />
    </div>
  );
}