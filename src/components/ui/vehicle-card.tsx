import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/lib/store';
import { ArrowRight, Gauge, DollarSign } from 'lucide-react';
interface VehicleCardProps {
  vehicle: Vehicle;
}
export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link 
      to={`/vehicle/${vehicle.id}`}
      className="group block bg-charcoal rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-gold/50 hover:shadow-glow"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={vehicle.image} 
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <div className="bg-obsidian/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10">
            {vehicle.year}
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white leading-tight">{vehicle.make}</h3>
            <p className="text-muted-foreground font-serif italic">{vehicle.model}</p>
          </div>
          <div className="text-gold font-bold text-lg flex items-center">
            <DollarSign className="w-4 h-4" />
            {vehicle.price.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-white/5 pt-4">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            {vehicle.specs.mileage}
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowRight className="w-3.5 h-3.5" />
            {vehicle.specs.condition}
          </div>
        </div>
      </div>
    </Link>
  );
}