import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DuplicatePaymentModal({ open, onClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Duplicate Payment Warning</DialogTitle>
      <DialogContent>
        <DialogContentText>
          A similar payment was made recently. Do you still want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Proceed Anyway
        </Button>
      </DialogActions>
    </Dialog>
  );
}