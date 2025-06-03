import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import { SupabaseProvider } from "./components/SupabaseContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SupabaseProvider>
      <SnackbarProvider
      autoHideDuration={2000}
      maxSnack={3}
      anchorOrigin={{ vertical:'top', horizontal:'center' }}
      >
        <App />
      </SnackbarProvider>

    </SupabaseProvider>
  </StrictMode>
);
