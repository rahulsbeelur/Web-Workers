'use client';

import { useEffect, useState, useCallback } from "react";
import { Box, Button, Typography, Paper, LinearProgress } from "@mui/material";

export default function Home() {
  const [result, setResult] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isWorkerBusy, setIsWorkerBusy] = useState(false);
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [counter, setCounter] = useState(0);

  const captureLogs = useCallback((message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const myWorker = new Worker("/web-workers/sum.js");

      myWorker.onmessage = (event) => {
        const { type, message, value } = event.data;
        if (type === "log") {
          captureLogs(`Worker: ${message}`);
        } else if (type === "result") {
          setResult(value);
          setIsWorkerBusy(false);
          captureLogs('In Main Thread and got result');
        }
      };

      setWorker(myWorker);

      return () => {
        captureLogs("Main Thread - Terminating Worker");
        myWorker.terminate();
      };
    }
  }, [captureLogs]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isWorkerBusy) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      }, 1000);
    } else {
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isWorkerBusy]);

  const handleComputation = () => {
    if (!worker) return;

    setIsWorkerBusy(true);
    setTimer(0);
    setProgress(0);
    captureLogs("Main Thread - Sending data to worker...");

    worker.postMessage(5000000);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: 'column', padding: 2 }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4">Web Worker Example</Typography>

          <Button
            variant="contained"
            onClick={handleComputation}
            sx={{ marginTop: 2 }}
            disabled={isWorkerBusy}
          >
            Start Computation
          </Button>

          {isWorkerBusy && (
            <>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Elapsed Time: {timer}s
              </Typography>
              <LinearProgress variant="determinate" value={progress} sx={{ marginTop: 2 }} />
            </>
          )}

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
          <Button onClick={() => {
            captureLogs('Increment happening on Main Thread');
            setCounter(counter + 1);
          }}>Increment</Button>
          <Button onClick={() => {
            captureLogs('Decrement happening on Main Thread');
            setCounter(counter - 1);
            }}>Decrement</Button>
          <Button onClick={() => setCounter(0)}>Reset</Button>
        </Box>
        <Typography variant="h5">Start Incrementing/Decrementing the counter once the computation has started</Typography>
      </Box>
    </Box>
  );
}
