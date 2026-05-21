import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

const PAYMENTS = [
  { id: 'PAY001', booking: 'DCABC001', user: 'Rahul Sharma', amount: 2100, method: 'UPI', gateway: 'Razorpay', status: 'success', date: '2024-12-15' },
  { id: 'PAY002', booking: 'DCABC002', user: 'Priya Patel', amount: 3100, method: 'Card', gateway: 'Razorpay', status: 'success', date: '2024-12-14' },
  { id: 'PAY003', booking: 'DCABC003', user: 'Amit Kumar', amount: 1100, method: 'Net Banking', gateway: 'Razorpay', status: 'success', date: '2024-12-14' },
  { id: 'PAY004', booking: 'DCABC004', user: 'Sneha Gupta', amount: 5100, method: 'UPI', gateway: 'Razorpay', status: 'pending', date: '2024-12-20' },
  { id: 'PAY005', booking: 'DCABC005', user: 'Vikram Singh', amount: 5100, method: 'Card', gateway: 'Stripe', status: 'refunded', date: '2024-12-10' },
  { id: 'PAY006', booking: 'DCABC006', user: 'Anita Sharma', amount: 2100, method: 'UPI', gateway: 'Razorpay', status: 'failed', date: '2024-12-18' },
];

export default function PaymentsPage() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Payments</Typography>
        <Typography variant="body2" color="textSecondary">Track all financial transactions</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#FFF8E1' }}>
              <TableCell sx={{ fontWeight: 700 }}>Payment ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Booking</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Method</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Gateway</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PAYMENTS.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell><Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.id}</Typography></TableCell>
                <TableCell>{p.booking}</TableCell>
                <TableCell>{p.user}</TableCell>
                <TableCell><Typography sx={{ fontWeight: 700, color: '#FF6F00' }}>₹{p.amount.toLocaleString()}</Typography></TableCell>
                <TableCell>{p.method}</TableCell>
                <TableCell>{p.gateway}</TableCell>
                <TableCell><Chip label={p.status} size="small" color={p.status === 'success' ? 'success' : p.status === 'refunded' ? 'warning' : p.status === 'failed' ? 'error' : 'default'} variant="outlined" /></TableCell>
                <TableCell>{p.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
