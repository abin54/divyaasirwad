import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BOOKINGS = [
  { id: 'DCABC001', user: 'Rahul Sharma', ritual: 'Satyanarayan Puja', temple: 'Kashi Vishwanath', date: '2024-12-15', time: '09:00 AM', amount: 2100, status: 'completed', payment: 'paid' },
  { id: 'DCABC002', user: 'Priya Patel', ritual: 'Rudrabhishek', temple: 'Somnath', date: '2024-12-14', time: '07:00 AM', amount: 3100, status: 'in_progress', payment: 'paid' },
  { id: 'DCABC003', user: 'Amit Kumar', ritual: 'Lakshmi Puja', temple: 'Home Puja', date: '2024-12-20', time: '06:00 PM', amount: 1100, status: 'confirmed', payment: 'paid' },
  { id: 'DCABC004', user: 'Sneha Gupta', ritual: 'Navgraha Puja', temple: 'TBD', date: '2025-01-01', time: '08:00 AM', amount: 5100, status: 'pending', payment: 'pending' },
  { id: 'DCABC005', user: 'Vikram Singh', ritual: 'Griha Pravesh', temple: 'Home Puja', date: '2024-12-10', time: '11:00 AM', amount: 5100, status: 'completed', payment: 'paid' },
  { id: 'DCABC006', user: 'Anita Sharma', ritual: 'Satyanarayan Puja', temple: 'Iskcon Delhi', date: '2024-12-18', time: '10:00 AM', amount: 2100, status: 'cancelled', payment: 'refunded' },
];

const statusColors: Record<string, string> = { pending: '#F59E0B', confirmed: '#2563EB', in_progress: '#FF6F00', completed: '#059669', cancelled: '#DC2626' };

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = statusFilter === 'all' ? BOOKINGS : BOOKINGS.filter((b) => b.status === statusFilter);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Bookings</Typography>
          <Typography variant="body2" color="textSecondary">Manage all puja and yatra bookings</Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status Filter</InputLabel>
          <Select value={statusFilter} label="Status Filter" onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="all">All Bookings</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#FFF8E1' }}>
              <TableCell sx={{ fontWeight: 700 }}>Booking ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Ritual</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Temple</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date/Time</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Payment</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b.id} hover sx={{ '&:hover': { backgroundColor: '#FFFBF0' } }}>
                <TableCell><Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{b.id}</Typography></TableCell>
                <TableCell>{b.user}</TableCell>
                <TableCell>{b.ritual}</TableCell>
                <TableCell>{b.temple}</TableCell>
                <TableCell>{b.date}<br /><Typography variant="caption" color="textSecondary">{b.time}</Typography></TableCell>
                <TableCell><Typography sx={{ fontWeight: 700, color: '#FF6F00' }}>₹{b.amount.toLocaleString()}</Typography></TableCell>
                <TableCell><Chip label={b.status.replace('_', ' ')} size="small" sx={{ backgroundColor: statusColors[b.status] + '20', color: statusColors[b.status], fontWeight: 600, textTransform: 'capitalize' }} /></TableCell>
                <TableCell><Chip label={b.payment} size="small" color={b.payment === 'paid' ? 'success' : b.payment === 'refunded' ? 'warning' : 'default'} variant="outlined" /></TableCell>
                <TableCell><IconButton size="small" color="primary"><VisibilityIcon /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
