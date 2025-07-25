import { Dialog, DialogContent } from './dialog';
import { ROICalculator } from '../forms/ROICalculator';

interface ROICalculatorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ROICalculatorDialog({ isOpen, onClose }: ROICalculatorDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <ROICalculator onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}