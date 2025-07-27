import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

type Props = {
  title: string;
  contentText: string;
  confirmButtonText: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({title, contentText, confirmButtonText, open, onClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
