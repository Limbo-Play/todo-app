import { Alert, Snackbar } from "@mui/material";

interface ErrorSnackbarProps {
  isOpen: boolean;
  errorMessage: string;
  onClose: () => void;
}

const ErrorSnackbar = ({
  isOpen,
  onClose,
  errorMessage,
}: ErrorSnackbarProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={!!isOpen}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
