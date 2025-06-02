import React, { useState } from "react";
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

export default function Navbar(props) {

  const { isLoggedIn } = props
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

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
    { label: "Website", href: "https://tierrabatida.com.ar/" },
    {
      label: "Smart Manager",
      href: "https://tierrabatida.com.ar/wp-admin/admin.php?page=smart-manager",
    },
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
            sx={{ color: "white" }}
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

  return (
    <AppBar position="absolute" sx={{ backgroundColor: "#242424", zIndex: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ width: "150px" }}
            src="/logoTBWorkshop.png"
            alt="Logo"
          />
        </Box>

        {/* Desktop Nav */}
        {!isMobile && isLoggedIn ? (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {menuItems.map(({ label, to, href }) =>
              to ? (
                <Link
                  key={label}
                  to={to}
                  style={{ color: "#555859", textDecoration: "none" }}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  {label}
                </a>
              )
            )}
              <button onClick={handleLogout}>Logout</button>
          </Box>
        ) : isMobile && isLoggedIn ? (
          <>
            {/* Hamburger Icon for Mobile */}
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
        ):(null)}
      </Toolbar>

      {/* Version tag */}
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
