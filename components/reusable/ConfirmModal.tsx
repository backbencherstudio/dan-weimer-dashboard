
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import CustomModal from "./CustomModal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isPending = false,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
}: ConfirmModalProps) => {
  return (
    <CustomModal className="w-[450px]" open={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-sm text-slate-500">{description}</p>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="h-[44px] min-w-[120px] rounded-xl border-none bg-[#F2F4F7] text-[#475467] font-bold hover:bg-slate-200"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="h-[44px] min-w-[120px] rounded-xl bg-red-500 text-white font-bold hover:bg-red-600"
          >
            {isPending
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : confirmLabel
            }
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};