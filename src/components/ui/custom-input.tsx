import React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';
interface PriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onPriceChange?: (val: number) => void;
}
export function PriceInput({ className, onPriceChange, defaultValue, ...props }: PriceInputProps) {
  const [displayValue, setDisplayValue] = React.useState(
    defaultValue ? Number(defaultValue).toLocaleString() : ''
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const num = parseInt(raw, 10) || 0;
    setDisplayValue(num > 0 ? num.toLocaleString() : '');
    onPriceChange?.(num);
  };
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
      <Input
        {...props}
        className={cn("pl-8 bg-secondary border-white/5", className)}
        value={displayValue}
        onChange={handleChange}
        placeholder="0.00"
      />
    </div>
  );
}