import React, { useEffect, useState } from "react";
import { 
  Button, Card, CardContent, Typography, Grid, CircularProgress, 
  Alert, Snackbar, Box, CardActions, Chip, Divider, CardHeader,
  Avatar, IconButton, Tooltip, Fade, Paper, LinearProgress
} from "@mui/material";
import { green, orange, red, blue, grey } from '@mui/material/colors';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import ComputerIcon from '@mui/icons-material/Computer';
import axios from 'axios';

const API_URL = "http://localhost:5062/api/hyperv";

export default function VMList() {
  const [vms, setVMs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(null);
  
  const fetchVMs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/vms`);
      setVMs(response.data);
      setError(null);
    } catch (err) {
      console.error("Errore durante il recupero delle VM:", err);
      setError(err.response?.data?.error || err.message || "Errore di connessione al server");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchVMs();
    
    // Imposta un intervallo per aggiornare automaticamente la lista delle VM
    const interval = setInterval(() => {
      fetchVMs();
    }, 30000); // Aggiorna ogni 30 secondi
    
    setRefreshInterval(interval);
    
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);
  
  const handleAction = async (name, action) => {
    try {
      setActionLoading(name + action);
      if (action === "delete") {
        await axios.delete(`${API_URL}/${action}/${name}`);
      } else {
        await axios.post(`${API_URL}/${action}/${name}`);
      }
      
      await fetchVMs();
      setError(null);
    } catch (err) {
      console.error(`Errore durante l'azione ${action}:`, err);
      setError(err.response?.data?.error || err.message || `Errore durante l'operazione ${action}`);
    } finally {
      setActionLoading("");
    }
  };
  
  const getStateColor = (state) => {
    switch(state) {
      case "Running": return green[500];
      case "Off": return grey[500];
      case "Stopping": return orange[500];
      case "Starting": return blue[500];
      default: return grey[500];
    }
  };
  
  const getStateIcon = (state) => {
    return {
      backgroundColor: getStateColor(state)
    };
  };
  
  const handleCloseError = () => {
    setError(null);
  };
  
  if (loading && vms.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="body1" sx={{ mt: 3, fontWeight: 500 }}>Caricamento macchine virtuali...</Typography>
        <LinearProgress sx={{ width: '250px', mt: 2, borderRadius: 1, height: 6 }} />
      </Box>
    );
  }
  
  return (
    <>
      <Snackbar 
        open={error !== null} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Fade}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}
        >
          {error}
        </Alert>
      </Snackbar>
      
      {vms.length === 0 && !loading ? (
        <Paper elevation={2} sx={{ textAlign: 'center', py: 5, px: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ width: 80, height: 80, mb: 3, bgcolor: 'primary.light' }}>
              <ComputerIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h5" color="text.primary" gutterBottom fontWeight={500}>
              Nessuna macchina virtuale trovata
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '500px', mx: 'auto', mb: 3 }}>
              Non ci sono macchine virtuali disponibili in Hyper-V. Verifica che il servizio sia attivo e funzionante.
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<RefreshIcon />} 
              onClick={fetchVMs} 
              sx={{ mt: 2, px: 3, py: 1, borderRadius: 2 }}
            >
              Aggiorna
            </Button>
          </Box>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {vms.map(vm => (
            <Grid item xs={12} md={6} lg={4} key={vm.name}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardHeader
                  sx={{
                    bgcolor: vm.state === "Running" ? 'success.light' : vm.state === "Off" ? 'grey.100' : 'warning.light',
                    pb: 2,
                    '& .MuiCardHeader-title': {
                      fontWeight: 600
                    }
                  }}
                  avatar={
                    <Avatar 
                      sx={{
                        ...getStateIcon(vm.state),
                        width: 48,
                        height: 48,
                        boxShadow: 2
                      }}
                    >
                      {vm.name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={<Typography variant="h6">{vm.name}</Typography>}
                  subheader={
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Chip 
                        label={vm.state} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getStateColor(vm.state), 
                          color: 'white',
                          fontWeight: 'bold',
                          px: 1
                        }} 
                      />
                      <Typography variant="caption" sx={{ ml: 1, color: vm.state === "Running" ? 'success.dark' : vm.state === "Off" ? 'text.secondary' : 'warning.dark', fontWeight: 500 }}>
                        Ultimo aggiornamento: {new Date().toLocaleTimeString()}
                      </Typography>
                    </Box>
                  }
                  action={
                    <IconButton onClick={fetchVMs} size="small" sx={{ mr: 1, mt: 1 }}>
                      <RefreshIcon fontSize="small" />
                    </IconButton>
                  }
                />
                <Divider />
                <CardContent sx={{ flexGrow: 1, pb: 0, pt: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body1" color="text.primary" gutterBottom>
                      <strong>Stato:</strong> {vm.state === "Running" ? "In esecuzione" : vm.state === "Off" ? "Spenta" : vm.state}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Tipo:</strong> Macchina Virtuale Hyper-V
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>ID:</strong> {vm.name.toLowerCase().replace(/\s+/g, '-')}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 1, display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
                  <Box sx={{ display: 'flex', width: '100%', mb: 1, gap: 1 }}>
                    <Tooltip 
                      title={vm.state === "Running" ? "La VM è già in esecuzione" : "Avvia la macchina virtuale"}
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      arrow
                    >
                      <span style={{ width: '100%' }}>
                        <Button
                          variant="contained"
                          color="success"
                          disabled={vm.state === "Running" || actionLoading !== ""}
                          onClick={() => handleAction(vm.name, "start")}
                          fullWidth
                          startIcon={actionLoading === vm.name + "start" ? 
                            <CircularProgress size={20} color="inherit" /> : 
                            <PlayArrowIcon />}
                          sx={{
                            borderRadius: 2,
                            py: 1,
                            boxShadow: 2,
                            transition: 'all 0.2s',
                            '&:not(:disabled):hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: 3
                            }
                          }}
                        >
                          Avvia
                        </Button>
                      </span>
                    </Tooltip>
                    
                    <Tooltip 
                      title={vm.state !== "Running" ? "La VM non è in esecuzione" : "Arresta la macchina virtuale"}
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      arrow
                    >
                      <span style={{ width: '100%' }}>
                        <Button
                          variant="contained"
                          color="warning"
                          disabled={vm.state !== "Running" || actionLoading !== ""}
                          onClick={() => handleAction(vm.name, "stop")}
                          fullWidth
                          startIcon={actionLoading === vm.name + "stop" ? 
                            <CircularProgress size={20} color="inherit" /> : 
                            <StopIcon />}
                          sx={{
                            borderRadius: 2,
                            py: 1,
                            boxShadow: 2,
                            transition: 'all 0.2s',
                            '&:not(:disabled):hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: 3
                            }
                          }}
                        >
                          Arresta
                        </Button>
                      </span>
                    </Tooltip>
                  </Box>
                  
                  <Tooltip 
                    title="Elimina definitivamente la macchina virtuale"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    arrow
                  >
                    <span style={{ width: '100%' }}>
                      <Button
                        variant="outlined"
                        color="error"
                        disabled={actionLoading !== ""}
                        onClick={() => handleAction(vm.name, "delete")}
                        fullWidth
                        startIcon={actionLoading === vm.name + "delete" ? 
                          <CircularProgress size={20} color="inherit" /> : 
                          <DeleteIcon />}
                        sx={{
                          borderRadius: 2,
                          py: 1,
                          transition: 'all 0.2s',
                          '&:not(:disabled):hover': {
                            bgcolor: 'error.light',
                            color: 'white',
                            borderColor: 'error.light'
                          }
                        }}
                      >
                        Elimina
                      </Button>
                    </span>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="outlined" 
          onClick={fetchVMs} 
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Aggiornamento..." : "Aggiorna lista VM"}
        </Button>
      </Box>
    </>
  );

}