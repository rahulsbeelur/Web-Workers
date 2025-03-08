import { Box, Button } from "@mui/material";
import Footer from "./components/footer";

const buttonStyle = {
  color: "white",
  backgroundColor: "transparent",
  border: "1px solid white",
  padding: "8px 16px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
};

export const metadata = {
  title: "Web Worker",
  description: "Simple Web Worker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{padding: 0}}>
      <body style={{margin: 0}}>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Box sx={{
            backgroundColor: "black",
            color: "white",
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}>
            <Box sx={{ display: "flex", gap: 3 }}>
              {['/', '/web-worker', '/non-web-worker'].map((href, idx) => (
                <Button key={idx} href={href} sx={buttonStyle}>
                  {['Home', 'Web Worker', 'Non Web Worker'][idx]}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>{children}</Box>
          <Footer />
        </Box>
      </body>
    </html>
  );
}
