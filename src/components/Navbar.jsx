import React, { useContext, useState } from "react";
import { SupabaseContext } from "./SupabaseContext";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { supabase } from "../supaBase";
import { useLocation } from "react-router-dom";


export default function Navbar() {
  const { session, loading } = useContext(SupabaseContext); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  
  const location = useLocation();
  if (location.pathname === "/Login") 
    return null;
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/Login");
  };

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Strings", to: "/Strings" },
    { label: "Workshop", to: "/Workshop" },
    { label: "Reclamations", to: "/Reclamations" },
    { label: "Demos", to: "/Demos" },
    { label: "Changelog", to: "/Changelog" },
  ];

  const drawerList = (
    <Box
      sx={{ width: 250, backgroundColor: "#555859", height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {menuItems.map(({ label, to, href }) => (
          <ListItem
            sx={{ color: "white", fontSize:'small' }}
            button
            key={label}
            component={to ? Link : "a"}
            to={to}
            href={href}
            target={href ? "_blank" : undefined}
          >
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (loading) return null
  return (
    <AppBar position="absolute" sx={{ backgroundColor: "#242424", zIndex: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ width: "150px" }}
            src="/logoTBWorkshop.png"
            alt="Logo"
          />
        </Box>

        {/* Desktop Nav */}
        {!isMobile && session ? (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {menuItems.map(({ label, to, href }) =>
              to ? (
                <Link
                  key={label}
                  to={to}
                  style={{ color: "#ffff", textDecoration: "none", fontSize:'small' }}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#fff", textDecoration: "none", fontSize:'small' }}
                >
                  {label}
                </a>
              )
            )}
            <button style={{color:'#fff'}} onClick={handleLogout}>Logout</button>
          </Box>
        ) : isMobile && session ? (
          <>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList}
            </Drawer>
          </>
        ) : null}
      </Toolbar>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 10,
          color: "#555959",
          fontSize: "12px",
        }}
      >
        v {__APP_VERSION__}
      </Box>
    </AppBar>
  );
}
