import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  specs: {
    engine: string;
    hp: string;
    mileage: string;
    condition: string;
  };
  owner: {
    name: string;
    contact: string;
  };
  createdAt: string;
}
interface InventoryState {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
}
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    make: 'Ferrari',
    model: 'Roma',
    year: 2023,
    price: 243000,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200',
    specs: {
      engine: '3.9L V8 Turbo',
      hp: '612 hp',
      mileage: '1,200 mi',
      condition: 'Pristine'
    },
    owner: { name: 'Enzo S.', contact: 'enzo@example.com' },
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    make: 'Lamborghini',
    model: 'Huracán Tecnica',
    year: 2024,
    price: 295000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200',
    specs: {
      engine: '5.2L V10',
      hp: '631 hp',
      mileage: '500 mi',
      condition: 'Showroom'
    },
    owner: { name: 'Marco V.', contact: 'marco@example.com' },
    createdAt: new Date().toISOString(),
  }
];
export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      vehicles: MOCK_VEHICLES,
      addVehicle: (vehicle) => set((state) => ({
        vehicles: [
          ...state.vehicles,
          { ...vehicle, id: uuidv4(), createdAt: new Date().toISOString() }
        ]
      })),
      updateVehicle: (id, updates) => set((state) => ({
        vehicles: state.vehicles.map((v) => (v.id === id ? { ...v, ...updates } : v))
      })),
      deleteVehicle: (id) => set((state) => ({
        vehicles: state.vehicles.filter((v) => v.id !== id)
      })),
    }),
    {
      name: 'velocita-inventory',
    }
  )
);