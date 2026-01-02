import React, { useState, useMemo, useEffect } from 'react';
import { useInventoryStore } from '@/lib/store';
import { VehicleCard } from '@/components/ui/vehicle-card';
import { Input } from '@/components/ui/input';
import { Search, X, ListFilter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
export function ShowroomPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isHydrated, setIsHydrated] = useState(false);
  const vehicles = useInventoryStore((s) => s.vehicles);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const filteredAndSortedVehicles = useMemo(() => {
    let result = (vehicles || []).filter((v) =>
      `${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.year - a.year);
    }
    return result;
  }, [vehicles, search, sortBy]);
  if (!isHydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }
  const handleReset = () => {
    setSearch('');
    setSortBy('newest');
  };
  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-5xl md:text-6xl font-bold text-white">The Showroom</h1>
          <Badge className="bg-gold/20 text-gold border-none mt-2 h-6">{vehicles?.length || 0} Units</Badge>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our curated collection of the world's most exquisite high-performance vehicles.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-gold transition-colors" />
          <Input
            placeholder="Search by make or model..."
            className="pl-12 pr-10 h-14 bg-charcoal border-white/5 text-lg rounded-xl focus:border-gold/50 focus:ring-gold/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'newest' ? 'default' : 'outline'}
            className={`h-14 px-6 rounded-xl ${
              sortBy === 'newest' ? 'bg-gold text-obsidian hover:bg-gold/90 border-none' : 'border-white/10 hover:bg-white/5'
            }`}
            onClick={() => setSortBy('newest')}
          >
            <ListFilter className="w-4 h-4 mr-2" />
            Newest
          </Button>
          <Button
            variant={sortBy === 'price-low' ? 'default' : 'outline'}
            className={`h-14 px-4 rounded-xl ${
              sortBy === 'price-low' ? 'bg-gold text-obsidian hover:bg-gold/90 border-none' : 'border-white/10 hover:bg-white/5'
            }`}
            onClick={() => setSortBy('price-low')}
          >
            Price: Low
          </Button>
          <Button
            variant={sortBy === 'price-high' ? 'default' : 'outline'}
            className={`h-14 px-4 rounded-xl ${
              sortBy === 'price-high' ? 'bg-gold text-obsidian hover:bg-gold/90 border-none' : 'border-white/10 hover:bg-white/5'
            }`}
            onClick={() => setSortBy('price-high')}
          >
            Price: High
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedVehicles.length > 0 ? (
            filteredAndSortedVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-6">
              <div className="flex justify-center">
                <SlidersHorizontal className="w-16 h-16 text-white/5" />
              </div>
              <div className="space-y-2">
                <p className="text-xl text-muted-foreground">No vehicles matching your criteria.</p>
                <Button
                  variant="link"
                  className="text-gold hover:text-gold/80 p-0"
                  onClick={handleReset}
                >
                  Reset all filters
                </Button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}