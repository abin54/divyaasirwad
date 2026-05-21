import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentsIcon from '@mui/icons-material/Payments';

const stats = [
  { title: 'Total Users', value: '24,850', icon: <PeopleIcon />, change: '+12%', color: '#2196F3' },
  { title: 'Temples Listed', value: '1,247', icon: <TempleHinduIcon />, change: '+5%', color: '#FF9800' },
  { title: 'Total Bookings', value: '8,432', icon: <BookOnlineIcon />, change: '+18%', color: '#4CAF50' },
  { title: 'Revenue (This Month)', value: '₹12,45,000', icon: <PaymentsIcon />, change: '+22%', color: '#9C27B0' },
];

const chartData = [
  { month: 'Jan', bookings: 400, revenue: 240000 }, { month: 'Feb', bookings: 500, revenue: 320000 },
  { month: 'Mar', bookings: 600, revenue: 380000 }, { month: 'Apr', bookings: 800, revenue: 520000 },
  { month: 'May', bookings: 750, revenue: 480000 }, { month: 'Jun', bookings: 900, revenue: 620000 },
  { month: 'Jul', bookings: 1100, revenue: 750000 }, { month: 'Aug', bookings: 1200, revenue: 820000 },
  { month: 'Sep', bookings: 1050, revenue: 710000 }, { month: 'Oct', bookings: 1300, revenue: 920000 },
  { month: 'Nov', bookings: 1400, revenue: 1020000 }, { month: 'Dec', bookings: 1600, revenue: 1245000 },
];

const recentBookings = [
  { id: 'DCABC001', user: 'Rahul Sharma', ritual: 'Satyanarayan Puja', date: '2024-12-15', amount: 2100, status: 'Completed' },
  { id: 'DCABC002', user: 'Priya Patel', ritual: 'Rudrabhishek', date: '2024-12-14', amount: 3100, status: 'In Progress' },
  { id: 'DCABC003', user: 'Amit Kumar', ritual: 'Lakshmi Puja', date: '2024-12-14', amount: 1100, status: 'Confirmed' },
  { id: 'DCABC004', user: 'Sneha Gupta', ritual: 'Navgraha Puja', date: '2024-12-13', amount: 5100, status: 'Pending' },
];

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Dashboard</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Welcome back! Here's your spiritual marketplace overview.</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">{stat.title}</Typography>
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>{stat.value}</Typography>
                <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 600 }}>{stat.change} vs last month</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Revenue & Bookings Overview</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#FF6F00" strokeWidth={3} name="Revenue (₹)" />
                <Line type="monotone" dataKey="bookings" stroke="#2196F3" strokeWidth={3} name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Recent Bookings</Typography>
              {recentBookings.map((b, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: i < recentBookings.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{b.ritual}</Typography>
                    <Typography variant="caption" color="textSecondary">{b.user} • {b.id}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#FF6F00' }}>₹{b.amount}</Typography>
                    <Typography variant="caption" sx={{ color: b.status === 'Completed' ? '#4CAF50' : b.status === 'In Progress' ? '#FF9800' : '#2196F3' }}>{b.status}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
