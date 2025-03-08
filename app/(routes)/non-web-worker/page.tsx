"use client";

import { useEffect, useState, useCallback } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";

export default function Home() {
  const [result, setResult] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isComputing, setIsComputing] = useState(false);
  const [counter, setCounter] = useState(0);

  const captureLogs = useCallback((message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  }, []);

  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = captureLogs;

    return () => {
      console.log = originalConsoleLog;
    };
  }, [captureLogs]);

  const heavyComputation = () => {
    console.log("Inside computing");
    let sum = 0;
    const startTime = Date.now();
    const timeLimit = 10000;
    while (Date.now() - startTime < timeLimit) {
      sum += Math.random();
    }
    console.log("Done computing");
    return sum;
  };

  const handleComputation = () => {
    setIsComputing(true);
    console.log("Main Thread - Starting computation...");
    const result = heavyComputation();
    setResult(result);
    console.log("Main Thread - Computation complete");
    setIsComputing(false);
  };


  return (
    <Box sx={{ display: "flex", flexDirection: 'column', padding: 2 }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4">Main Thread Computation Example</Typography>

          <Button
            variant="contained"
            onClick={handleComputation}
            sx={{ marginTop: 2 }}
            disabled={isComputing}
          >
            Start Computation
          </Button>

          {result !== null && (
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Computed Sum: {result}
            </Typography>
          )}
        </Box>

        <Paper
          sx={{
            width: 1000,
            height: 400,
            overflowY: "scroll",
            padding: 2,
            marginLeft: 3,
            backgroundColor: "#fafafa",
            boxShadow: 3,
          }}
        >
          <Typography variant="h6">Console Logs:</Typography>
          <Box
            sx={{
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
              fontSize: "14px",
              maxHeight: "100%",
              overflowY: "auto",
              marginTop: 1,
            }}
          >
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </Box>
        </Paper>
      </Box>

      <Box>
        <Typography>Counter = {counter}</Typography>
        <Box>
          <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
          <Button onClick={() => setCounter(counter - 1)}>Decrement</Button>
          <Button onClick={() => setCounter(0)}>Reset</Button>
        </Box>
        <Typography variant="h5">Start Incrementing/Decrementing the counter once the computation has started</Typography>
      </Box>
    </Box>
  );
}
