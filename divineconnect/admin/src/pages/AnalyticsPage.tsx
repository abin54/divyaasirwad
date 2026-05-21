import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', pujas: 350, yatras: 50, donations: 80 },
  { month: 'Feb', pujas: 420, yatras: 60, donations: 95 },
  { month: 'Mar', pujas: 500, yatras: 70, donations: 110 },
  { month: 'Apr', pujas: 650, yatras: 90, donations: 140 },
  { month: 'May', pujas: 580, yatras: 110, donations: 125 },
  { month: 'Jun', pujas: 700, yatras: 130, donations: 160 },
];

const deityPopularity = [
  { name: 'Shiva', value: 35 }, { name: 'Krishna', value: 25 },
  { name: 'Durga', value: 20 }, { name: 'Hanuman', value: 12 },
  { name: 'Lakshmi', value: 8 },
];

const COLORS = ['#FF6F00', '#2196F3', '#E91E63', '#4CAF50', '#9C27B0'];

export default function AnalyticsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Analytics</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Deep insights into platform performance</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Monthly Bookings Breakdown</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="pujas" fill="#FF6F00" name="Pujas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="yatras" fill="#2196F3" name="Yatras" radius={[4, 4, 0, 0]} />
                <Bar dataKey="donations" fill="#4CAF50" name="Donations" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Deity Popularity</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={deityPopularity} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {deityPopularity.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2 }}>
              {deityPopularity.map((d, i) => (
                <Box key={d.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: COLORS[i] }} />
                    <Typography variant="body2">{d.name}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{d.value}%</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Key Metrics</Typography>
            <Grid container spacing={3}>
              {[
                { label: 'Avg. Booking Value', value: '₹2,450' },
                { label: 'Conversion Rate', value: '68%' },
                { label: 'Repeat Customers', value: '42%' },
                { label: 'Avg. Rating', value: '4.6 ★' },
                { label: 'Top City', value: 'Varanasi' },
                { label: 'Top Deity', value: 'Shiva' },
              ].map((m) => (
                <Grid item xs={6} md= {4} key={m.label}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#FFF8E1', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#FF6F00' }}>{m.value}</Typography>
                    <Typography variant="body2" color="textSecondary">{m.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}