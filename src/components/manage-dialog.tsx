import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PriceInput } from '@/components/ui/custom-input';
import { useInventoryStore } from '@/lib/store';
import { toast } from 'sonner';
export function ManageDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const addVehicle = useInventoryStore((s) => s.addVehicle);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: 2024,
    price: 0,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    engine: '',
    hp: '',
    mileage: '',
    ownerName: '',
    ownerContact: '',
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.make || !formData.model || formData.price <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }
    addVehicle({
      make: formData.make,
      model: formData.model,
      year: formData.year,
      price: formData.price,
      image: formData.image,
      specs: {
        engine: formData.engine || 'V8 Engine',
        hp: formData.hp || '500 hp',
        mileage: formData.mileage || 'Brand New',
        condition: 'Mint',
      },
      owner: {
        name: formData.ownerName || 'Velocita Dealer',
        contact: formData.ownerContact || 'sales@velocita.com',
      },
    });
    toast.success('Vehicle successfully added to showroom');
    setOpen(false);
    setFormData({
      make: '', model: '', year: 2024, price: 0, 
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
      engine: '', hp: '', mileage: '', ownerName: '', ownerContact: ''
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-charcoal border-white/10 text-silver">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-white">Add New Inventory</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Input id="make" value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} placeholder="Ferrari" className="bg-secondary border-white/5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder="Roma" className="bg-secondary border-white/5" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" value={formData.year} onChange={e => setFormData({...formData, year: Number(e.target.value)})} className="bg-secondary border-white/5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <PriceInput onPriceChange={val => setFormData({...formData, price: val})} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="bg-secondary border-white/5" />
          </div>
          <div className="space-y-2 pt-2 border-t border-white/5">
            <Label className="text-gold text-xs uppercase tracking-widest font-bold">Specs</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Engine (e.g. 4.0L V8)" value={formData.engine} onChange={e => setFormData({...formData, engine: e.target.value})} className="bg-secondary border-white/5" />
              <Input placeholder="Mileage" value={formData.mileage} onChange={e => setFormData({...formData, mileage: e.target.value})} className="bg-secondary border-white/5" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="text-silver hover:text-white">Cancel</Button>
            <Button type="submit" className="bg-gold text-obsidian hover:bg-gold/90 font-bold px-8">Complete Listing</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}