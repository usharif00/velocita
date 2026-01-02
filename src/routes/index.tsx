import React, { useState } from 'react';
import { useInventoryStore } from '@/lib/store';
import { VehicleCard } from '@/components/ui/vehicle-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function ShowroomPage() {
  const [search, setSearch] = useState('');
  const vehicles = useInventoryStore((s) => s.vehicles);
  const filteredVehicles = vehicles.filter((v) => 
    `${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white">The Showroom</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our curated collection of the world's most exquisite high-performance vehicles.
        </p>
      </div>
      <div className="max-w-2xl mx-auto relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-gold transition-colors" />
        <Input 
          placeholder="Search by make or model..."
          className="pl-12 h-14 bg-charcoal border-white/5 text-lg rounded-full focus:border-gold/50 focus:ring-gold/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <p className="text-xl text-muted-foreground">No vehicles matching your search.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}