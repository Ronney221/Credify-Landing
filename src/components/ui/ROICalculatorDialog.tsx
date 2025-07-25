import { Dialog, DialogContent } from './dialog';
import { DetailedROICalculator } from '../forms/DetailedROICalculator';

interface ROICalculatorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ROICalculatorDialog({ isOpen, onClose }: ROICalculatorDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DetailedROICalculator onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}