import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider
    autoHideDuration={2000}
    maxSnack={3}
    anchorOrigin={{ vertical:'top', horizontal:'center' }}
    >
      <App />
    </SnackbarProvider>
  </StrictMode>
);
