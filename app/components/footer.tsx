import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ padding: 2, backgroundColor: "black", color: "white", textAlign: "center" }}>
      <Typography variant="body2">
        <Link href="https://rahulsbeelur.com" color="inherit" target="_blank">
          Visit My Website
        </Link>
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        © 2025 Rahul S. Beelur
      </Typography>
    </Box>
  );
}
