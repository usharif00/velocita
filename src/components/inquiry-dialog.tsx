import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Vehicle } from '@/lib/store';
import { Mail } from 'lucide-react';
interface InquiryDialogProps {
  vehicle: Vehicle;
  children: React.ReactNode;
}
export function InquiryDialog({ vehicle, children }: InquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Inquiry Sent', {
      description: `Your interest in the ${vehicle.make} ${vehicle.model} has been registered.`,
    });
    setIsSubmitting(false);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-charcoal border-white/10 text-silver">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-white">Private Inquiry</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Request confidential details or a private viewing for the {vehicle.year} {vehicle.make} {vehicle.model}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="inquiry-name">Full Name</Label>
            <Input id="inquiry-name" placeholder="Alexander Rossi" className="bg-secondary border-white/5 focus:border-gold/50" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inquiry-email">Email Address</Label>
            <Input id="inquiry-email" type="email" placeholder="alex@example.com" className="bg-secondary border-white/5 focus:border-gold/50" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inquiry-message">Message (Optional)</Label>
            <Textarea
              id="inquiry-message"
              placeholder="I am interested in discussing the provenance of this vehicle..."
              className="bg-secondary border-white/5 focus:border-gold/50 min-h-[100px]"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-obsidian hover:bg-gold/90 font-bold h-12 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}