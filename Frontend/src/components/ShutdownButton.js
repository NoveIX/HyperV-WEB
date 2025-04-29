import React, { useState } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Tooltip } from "@mui/material";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const API_URL = "http://localhost:5062/api/hyperv";

export default function ShutdownButton() {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleShutdown = async () => {
    try {
      setLoading(true);
      setDialogOpen(false);
      
      const response = await fetch(`${API_URL}/shutdown`, { method: "POST" });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante lo spegnimento dei servizi");
      }
      
      setSuccess(true);
    } catch (err) {
      console.error("Errore durante lo spegnimento:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <>
      <Tooltip title="Spegni tutti i servizi di Hyper-V">
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDialog}
          disabled={loading}
          startIcon={<PowerSettingsNewIcon />}
          size="medium"
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: 2
          }}
        >
          {loading ? (
            <>
              Spegnimento in corso
              <CircularProgress size={18} sx={{ ml: 1 }} color="inherit" />
            </>
          ) : (
            "Spegni servizi"
          )}
        </Button>
      </Tooltip>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Conferma spegnimento servizi
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sei sicuro di voler spegnere tutti i servizi di Hyper-V? Questa operazione potrebbe interrompere le macchine virtuali in esecuzione.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annulla
          </Button>
          <Button onClick={handleShutdown} color="error" variant="contained" autoFocus>
            Conferma spegnimento
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Servizi in fase di spegnimento
        </Alert>
      </Snackbar>
    </>
  );
}