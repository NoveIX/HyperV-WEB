import React, { useState } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Tooltip, Fade, Box, Typography } from "@mui/material";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import axios from 'axios';

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
      
      await axios.post(`${API_URL}/shutdown`);
      setSuccess(true);
    } catch (err) {
      console.error("Errore durante lo spegnimento:", err);
      setError(err.response?.data?.error || err.message || "Errore durante lo spegnimento dei servizi");
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
      <Tooltip title="Spegni tutti i servizi di Hyper-V" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDialog}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PowerSettingsNewIcon />}
          sx={{
            fontWeight: 'bold',
            px: 2.5,
            py: 1,
            borderRadius: '8px',
            boxShadow: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 4
            }
          }}
        >
          Spegni Servizi
        </Button>
      </Tooltip>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ bgcolor: 'error.main', color: 'white', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PowerSettingsNewIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              Conferma spegnimento servizi
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText id="alert-dialog-description">
            Sei sicuro di voler spegnere tutti i servizi di Hyper-V? Questa operazione potrebbe interrompere le macchine virtuali in esecuzione.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCloseDialog} 
            color="primary" 
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Annulla
          </Button>
          <Button 
            onClick={handleShutdown} 
            color="error" 
            variant="contained" 
            autoFocus
            sx={{ borderRadius: 2, px: 3, boxShadow: 2 }}
          >
            Conferma spegnimento
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={error !== null} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Fade}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Fade}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}
        >
          Servizi in fase di spegnimento
        </Alert>
      </Snackbar>
    </>
  );
}