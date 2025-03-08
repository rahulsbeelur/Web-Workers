"use client";

import { Box, Typography, Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/web-worker");
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: '100px',
        justifyContent: "center",
        color: "#333",
        textAlign: "center",
        gap: 10
      }}
    >
        <Paper
          sx={{
            padding: 4,
            borderRadius: 4,
            boxShadow: 6,
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 600, marginBottom: 3 }}>
            Web Worker Demo
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 400 }}>
            See how a web worker can run background tasks without blocking the UI.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            This page demonstrates the difference between using a web worker and not using one. When the worker is active, the UI remains responsive and your tasks run in the background.
          </Typography>
          <Button
            variant="contained"
            onClick={handleStart}
            sx={{
              backgroundColor: "#444",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
              },
              fontWeight: 500,
            }}
          >
            Start Demo
          </Button>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              Example for web workers versus no web workers.
            </Typography>
          </Box>
        </Paper>
    </Box>
  );
}
