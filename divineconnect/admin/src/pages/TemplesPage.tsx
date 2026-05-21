import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TEMPLES = [
  { id: '1', name: 'Kashi Vishwanath', city: 'Varanasi', state: 'UP', deity: 'Shiva', category: 'jyotirlinga', rating: 4.8, bookings: 2450, status: 'verified' },
  { id: '2', name: 'Banke Bihari', city: 'Vrindavan', state: 'UP', deity: 'Krishna', category: 'famous', rating: 4.7, bookings: 1890, status: 'verified' },
  { id: '3', name: 'Siddhivinayak', city: 'Mumbai', state: 'MH', deity: 'Ganesh', category: 'famous', rating: 4.8, bookings: 3200, status: 'verified' },
  { id: '4', name: 'Kali Mandir', city: 'Kolkata', state: 'WB', deity: 'Kali', category: 'historic', rating: 4.6, bookings: 1200, status: 'pending' },
  { id: '5', name: 'Lakshmi Narayan', city: 'Delhi', state: 'DL', deity: 'Lakshmi', category: 'famous', rating: 4.5, bookings: 980, status: 'verified' },
  { id: '6', name: 'Hanuman Mandir', city: 'Jaipur', state: 'RJ', deity: 'Hanuman', category: 'local', rating: 4.3, bookings: 450, status: 'pending' },
];

export default function TemplesPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Temples</Typography>
          <Typography variant="body2" color="textSecondary">Manage temple listings across India</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Add Temple</Button>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#FFF8E1' }}>
              <TableCell sx={{ fontWeight: 700 }}>Temple Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Deity</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Bookings</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TEMPLES.map((t) => (
              <TableRow key={t.id} hover>
                <TableCell><Typography sx={{ fontWeight: 600 }}>{t.name}</Typography></TableCell>
                <TableCell>{t.city}, {t.state}</TableCell>
                <TableCell><Chip label={t.deity} size="small" sx={{ backgroundColor: '#FFF3E0', color: '#FF6F00', fontWeight: 600 }} /></TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell><Typography sx={{ color: '#F59E0B', fontWeight: 700 }}>★ {t.rating}</Typography></TableCell>
                <TableCell>{t.bookings.toLocaleString()}</TableCell>
                <TableCell><Chip label={t.status} size="small" color={t.status === 'verified' ? 'success' : 'warning'} variant="outlined" /></TableCell>
                <TableCell>
                  <IconButton size="small" color="primary"><EditIcon /></IconButton>
                  <IconButton size="small" color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
