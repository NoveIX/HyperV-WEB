import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

const API_URL = "http://localhost:5062/api/hyperv";

export default function ShutdownButton() {
  const [loading, setLoading] = useState(false);
  const handleShutdown = async () => {
    setLoading(true);
    await fetch(`${API_URL}/shutdown`, { method: "POST" });
    setLoading(false);
  };
  return (
    <Button
      variant="contained"
      color="error"
      onClick={handleShutdown}
      disabled={loading}
      sx={{ m: 2 }}
    >
      Spegni servizi
      {loading && <CircularProgress size={18} sx={{ ml: 2 }} />}
    </Button>
  );
}