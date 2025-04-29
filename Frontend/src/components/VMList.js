import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";

const API_URL = "http://localhost:5062/api/hyperv";

export default function VMList() {
  const [vms, setVMs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const fetchVMs = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/vms`);
    const data = await res.json();
    setVMs(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchVMs();
  }, []);
  const handleAction = async (name, action) => {
    setActionLoading(name + action);
    await fetch(`${API_URL}/${action}/${name}`, { method: action === "delete" ? "DELETE" : "POST" });
    await fetchVMs();
    setActionLoading("");
  };
  if (loading) return <CircularProgress />;
  return (
    <Grid container spacing={2}>
      {vms.map(vm => (
        <Grid item xs={12} md={6} lg={4} key={vm.name}>
          <Card>
            <CardContent>
              <Typography variant="h6">{vm.name}</Typography>
              <Typography color="textSecondary">Stato: {vm.state}</Typography>
              <Button
                variant="contained"
                color="success"
                disabled={vm.state === "Running" || actionLoading}
                onClick={() => handleAction(vm.name, "start")}
                sx={{ m: 1 }}
              >
                Avvia
              </Button>
              <Button
                variant="contained"
                color="warning"
                disabled={vm.state !== "Running" || actionLoading}
                onClick={() => handleAction(vm.name, "stop")}
                sx={{ m: 1 }}
              >
                Arresta
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={actionLoading}
                onClick={() => handleAction(vm.name, "delete")}
                sx={{ m: 1 }}
              >
                Elimina
              </Button>
              {actionLoading.startsWith(vm.name) && <CircularProgress size={20} sx={{ ml: 2 }} />}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}