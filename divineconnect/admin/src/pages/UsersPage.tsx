import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const USERS = [
  { id: '1', name: 'Rahul Sharma', phone: '+91 9876543210', email: 'rahul@email.com', role: 'user', bookings: 12, status: 'active', joined: '2024-01-15' },
  { id: '2', name: 'Priya Patel', phone: '+91 9876543211', email: 'priya@email.com', role: 'user', bookings: 8, status: 'active', joined: '2024-02-20' },
  { id: '3', name: 'Pt. Ram Sharma', phone: '+91 9876543212', email: 'ram@email.com', role: 'pandit', bookings: 340, status: 'active', joined: '2024-01-10' },
  { id: '4', name: 'Admin', phone: '+91 9999999999', email: 'admin@divineconnect.com', role: 'admin', bookings: 0, status: 'active', joined: '2023-12-01' },
  { id: '5', name: 'Sneha Gupta', phone: '+91 9876543213', email: 'sneha@email.com', role: 'user', bookings: 4, status: 'inactive', joined: '2024-03-05' },
  { id: '6', name: 'Vikram Singh', phone: '+91 9876543214', email: 'vikram@email.com', role: 'user', bookings: 6, status: 'active', joined: '2024-04-12' },
];

export default function UsersPage() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Users</Typography>
        <Typography variant="body2" color="textSecondary">Manage platform users and their roles</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#FFF8E1' }}>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Bookings</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Joined</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {USERS.map((u) => (
              <TableRow key={u.id} hover>
                <TableCell><Typography sx={{ fontWeight: 600 }}>{u.name}</Typography></TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell><Chip label={u.role} size="small" color={u.role === 'pandit' ? 'warning' : u.role === 'admin' ? 'error' : 'primary'} variant="outlined" /></TableCell>
                <TableCell>{u.bookings}</TableCell>
                <TableCell><Chip label={u.status} size="small" color={u.status === 'active' ? 'success' : 'default'} /></TableCell>
                <TableCell>{u.joined}</TableCell>
                <TableCell>
                  <IconButton size="small" color={u.status === 'active' ? 'error' : 'success'}>{u.status === 'active' ? <BlockIcon /> : <CheckCircleIcon />}</IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
