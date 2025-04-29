import React, { useEffect, useState } from "react";
import { 
  Button, Card, CardContent, Typography, Grid, CircularProgress, 
  Alert, Snackbar, Box, CardActions, Chip, Divider, CardHeader,
  Avatar, IconButton, Tooltip
} from "@mui/material";
import { green, orange, red, blue, grey } from '@mui/material/colors';

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
      const res = await fetch(`${API_URL}/vms`);
      if (!res.ok) {
        throw new Error(`Errore nel caricamento delle VM: ${res.status}`);
      }
      const data = await res.json();
      setVMs(data);
      setError(null);
    } catch (err) {
      console.error("Errore durante il recupero delle VM:", err);
      setError(err.message);
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
      const res = await fetch(`${API_URL}/${action}/${name}`, { 
        method: action === "delete" ? "DELETE" : "POST" 
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Errore durante l'operazione ${action}`);
      }
      
      await fetchVMs();
      setError(null);
    } catch (err) {
      console.error(`Errore durante l'azione ${action}:`, err);
      setError(err.message);
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>Caricamento macchine virtuali...</Typography>
      </Box>
    );
  }
  
  return (
    <>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      
      {vms.length === 0 && !loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nessuna macchina virtuale trovata
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Non ci sono macchine virtuali disponibili in Hyper-V.
          </Typography>
          <Button variant="outlined" onClick={fetchVMs} sx={{ mt: 2 }}>
            Aggiorna
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {vms.map(vm => (
            <Grid item xs={12} md={6} lg={4} key={vm.name}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar sx={getStateIcon(vm.state)}>
                      {vm.name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={vm.name}
                  subheader={
                    <Chip 
                      label={vm.state} 
                      size="small" 
                      sx={{ 
                        backgroundColor: getStateColor(vm.state), 
                        color: 'white',
                        mt: 1
                      }} 
                    />
                  }
                />
                <Divider />
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Tooltip title={vm.state === "Running" ? "La VM è già in esecuzione" : "Avvia la macchina virtuale"}>
                    <span>
                      <Button
                        variant="contained"
                        color="success"
                        disabled={vm.state === "Running" || actionLoading !== ""}
                        onClick={() => handleAction(vm.name, "start")}
                        fullWidth
                      >
                        Avvia
                        {actionLoading === vm.name + "start" && <CircularProgress size={20} sx={{ ml: 1 }} color="inherit" />}
                      </Button>
                    </span>
                  </Tooltip>
                  
                  <Tooltip title={vm.state !== "Running" ? "La VM non è in esecuzione" : "Arresta la macchina virtuale"}>
                    <span>
                      <Button
                        variant="contained"
                        color="warning"
                        disabled={vm.state !== "Running" || actionLoading !== ""}
                        onClick={() => handleAction(vm.name, "stop")}
                        fullWidth
                        sx={{ mx: 1 }}
                      >
                        Arresta
                        {actionLoading === vm.name + "stop" && <CircularProgress size={20} sx={{ ml: 1 }} color="inherit" />}
                      </Button>
                    </span>
                  </Tooltip>
                  
                  <Tooltip title="Elimina definitivamente la macchina virtuale">
                    <span>
                      <Button
                        variant="contained"
                        color="error"
                        disabled={actionLoading !== ""}
                        onClick={() => handleAction(vm.name, "delete")}
                        fullWidth
                      >
                        Elimina
                        {actionLoading === vm.name + "delete" && <CircularProgress size={20} sx={{ ml: 1 }} color="inherit" />}
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