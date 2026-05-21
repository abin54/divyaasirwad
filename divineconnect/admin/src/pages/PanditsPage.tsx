import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const PANDITS = [
  { id: '1', name: 'Pt. Ram Sharma', phone: '+91 9876543210', city: 'Varanasi', speciality: 'Vedic Rituals', experience: 15, rating: 4.8, bookings: 340, verified: true },
  { id: '2', name: 'Pt. Suresh Tiwari', phone: '+91 9876543211', city: 'Delhi', speciality: 'Hawan & Yagya', experience: 12, rating: 4.7, bookings: 280, verified: true },
  { id: '3', name: 'Pt. Mukesh Joshi', phone: '+91 9876543212', city: 'Mumbai', speciality: 'Satyanarayan Puja', experience: 8, rating: 4.5, bookings: 190, verified: false },
  { id: '4', name: 'Pt. Anil Mishra', phone: '+91 9876543213', city: 'Kolkata', speciality: 'Durga Puja', experience: 20, rating: 4.9, bookings: 520, verified: true },
  { id: '5', name: 'Pt. Deepak Pandey', phone: '+91 9876543214', city: 'Jaipur', speciality: 'Rudrabhishek', experience: 6, rating: 4.3, bookings: 120, verified: false },
];

export default function PanditsPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Pandits</Typography>
          <Typography variant="body2" color="textSecondary">Manage verified pandits and priests</Typography>
        </Box>
        <Button variant="contained" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Add Pandit</Button>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#FFF8E1' }}>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Speciality</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Experience</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Bookings</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Verified</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PANDITS.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell><Typography sx={{ fontWeight: 600 }}>{p.name}</Typography></TableCell>
                <TableCell>{p.phone}</TableCell>
                <TableCell>{p.city}</TableCell>
                <TableCell>{p.speciality}</TableCell>
                <TableCell>{p.experience} yrs</TableCell>
                <TableCell><Typography sx={{ color: '#F59E0B', fontWeight: 700 }}>★ {p.rating}</Typography></TableCell>
                <TableCell>{p.bookings}</TableCell>
                <TableCell>{p.verified ? <Chip icon={<CheckCircleIcon />} label="Verified" color="success" size="small" /> : <Chip label="Pending" color="warning" size="small" />}</TableCell>
                <TableCell>
                  <IconButton size="small" color="success"><CheckCircleIcon /></IconButton>
                  <IconButton size="small" color="error"><CancelIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
