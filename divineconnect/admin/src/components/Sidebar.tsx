import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import PersonIcon from '@mui/icons-material/Person';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const DRAWER_WIDTH = 260;
const MENU = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Temples', icon: <TempleHinduIcon />, path: '/temples' },
  { text: 'Pandits', icon: <PersonIcon />, path: '/pandits' },
  { text: 'Bookings', icon: <BookOnlineIcon />, path: '/bookings' },
  { text: 'Payments', icon: <PaymentsIcon />, path: '/payments' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', backgroundColor: '#1A1A1A', color: '#fff' },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#FF6F00' }}>🛕 DivineConnect</Typography>
        <Typography variant="caption" sx={{ color: '#9CA3AF' }}>Admin Panel</Typography>
      </Box>
      <Divider sx={{ borderColor: '#333' }} />
      <List sx={{ px: 1, mt: 1 }}>
        {MENU.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                backgroundColor: location.pathname === item.path ? 'rgba(255,111,0,0.15)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255,111,0,0.1)' },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#FF6F00' : '#9CA3AF', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ '& .MuiListItemText-primary': { fontSize: 14, fontWeight: location.pathname === item.path ? 700 : 500, color: location.pathname === item.path ? '#FF6F00' : '#fff' } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
