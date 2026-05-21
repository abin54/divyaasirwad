import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TemplesPage from './pages/TemplesPage';
import PanditsPage from './pages/PanditsPage';
import BookingsPage from './pages/BookingsPage';
import PaymentsPage from './pages/PaymentsPage';
import UsersPage from './pages/UsersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: { main: '#FF6F00', light: '#FFB300', dark: '#E65100' },
    secondary: { main: '#FF9933' },
    background: { default: '#FFFBF0' },
  },
  typography: { fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif' },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '24px', backgroundColor: '#FFFBF0', overflow: 'auto' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/temples" element={<TemplesPage />} />
              <Route path="/pandits" element={<PanditsPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
