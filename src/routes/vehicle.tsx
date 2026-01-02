import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useInventoryStore } from '@/lib/store';
import { ChevronLeft, Gauge, Zap, Calendar, User, DollarSign, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
export function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicles = useInventoryStore((s) => s.vehicles);
  const deleteVehicle = useInventoryStore((s) => s.deleteVehicle);
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6">
        <h2 className="text-3xl font-bold">Vehicle Not Found</h2>
        <Link to="/">
          <Button variant="outline">Back to Showroom</Button>
        </Link>
      </div>
    );
  }
  const handleDelete = () => {
    deleteVehicle(vehicle.id);
    toast.error('Vehicle removed from inventory');
    navigate('/');
  };
  return (
    <div className="space-y-10 animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to Showroom
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <img 
              src={vehicle.image} 
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-charcoal p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 text-gold mb-2">
                <Gauge className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Engine</span>
              </div>
              <p className="text-xl font-semibold text-white">{vehicle.specs.engine}</p>
            </div>
            <div className="bg-charcoal p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 text-gold mb-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Power</span>
              </div>
              <p className="text-xl font-semibold text-white">{vehicle.specs.hp}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="space-y-4 mb-8">
            <Badge className="bg-gold/10 text-gold border-gold/20 text-sm py-1 px-4">{vehicle.year} Model</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white">{vehicle.make} {vehicle.model}</h1>
            <div className="flex items-center gap-2 text-3xl font-semibold text-gold">
              <DollarSign className="w-8 h-8" />
              {vehicle.price.toLocaleString()}
            </div>
          </div>
          <div className="space-y-6 flex-1">
            <div className="bg-charcoal/50 border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>Condition</span>
                </div>
                <span className="text-white font-medium">{vehicle.specs.condition}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Gauge className="w-5 h-5" />
                  <span>Mileage</span>
                </div>
                <span className="text-white font-medium">{vehicle.specs.mileage}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <User className="w-5 h-5" />
                  <span>Seller</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{vehicle.owner.name}</p>
                  <p className="text-xs text-muted-foreground">{vehicle.owner.contact}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex gap-4">
            <Button size="lg" className="flex-1 bg-gold text-obsidian font-bold h-14 rounded-xl">
              Inquire Now
            </Button>
            <Button 
              size="lg" 
              variant="destructive" 
              className="h-14 w-14 rounded-xl p-0"
              onClick={handleDelete}
            >
              <Trash2 className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}