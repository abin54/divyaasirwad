import React, { useState } from 'react';

// Interfaces for our Admin datasets
interface MockBooking {
  id: string;
  bookingId: string;
  devoteeName: string;
  ritualName: string;
  templeName: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  panditName?: string;
  prasadStatus?: 'processing' | 'dispatched' | 'delivered';
  trackingId?: string;
  courier?: string;
}

interface MockTemple {
  id: string;
  name: string;
  location: string;
  deity: string;
  totalBookings: number;
  verified: boolean;
  active: boolean;
}

interface MockPandit {
  id: string;
  name: string;
  phone: string;
  specialization: string;
  rating: number;
  active: boolean;
  status: 'available' | 'busy';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'temples' | 'pandits' | 'commission' | 'prasad'>('overview');

  // Interactive Mock Datasets with State
  const [bookings, setBookings] = useState<MockBooking[]>([
    { id: '1', bookingId: 'DC65A1B2', devoteeName: 'Raman Sharma', ritualName: 'Satyanarayan Puja', templeName: 'Kashi Vishwanath', amount: 2100, status: 'confirmed', date: '2026-05-22', panditName: 'Pt. Alok Shastri', prasadStatus: 'processing' },
    { id: '2', bookingId: 'DC89C3D4', devoteeName: 'Sushma Sen', ritualName: 'Rudrabhishek Hawan', templeName: 'Somnath Jyotirlinga', amount: 3100, status: 'in_progress', date: '2026-05-21', panditName: 'Pt. Ramesh Dwivedi', prasadStatus: 'processing' },
    { id: '3', bookingId: 'DC12E5F6', devoteeName: 'Aditya Das', ritualName: 'Lakshmi Puja', templeName: 'Dakshineswar Kali', amount: 2500, status: 'completed', date: '2026-05-20', panditName: 'Pt. Pranab Banerjee', prasadStatus: 'dispatched', trackingId: 'BLUE10293847', courier: 'BlueDart' },
    { id: '4', bookingId: 'DC34F7A9', devoteeName: 'Vikas Rao', ritualName: 'Navgraha Shanti Puja', templeName: 'Tirupati Balaji', amount: 4100, status: 'pending', date: '2026-05-23', prasadStatus: 'processing' },
    { id: '5', bookingId: 'DC78B4C0', devoteeName: 'Aarti Gupta', ritualName: 'Griha Pravesh Puja', templeName: 'Home Puja (Noida)', amount: 5100, status: 'completed', date: '2026-05-19', panditName: 'Pt. Hari Prasad', prasadStatus: 'delivered', trackingId: 'DTDC99887766', courier: 'DTDC' },
  ]);

  const [temples, setTemples] = useState<MockTemple[]>([
    { id: '1', name: 'Kashi Vishwanath Temple', location: 'Varanasi, UP', deity: 'Shiva', totalBookings: 142, verified: true, active: true },
    { id: '2', name: 'Somnath Jyotirlinga', location: 'Veraval, Gujarat', deity: 'Shiva', totalBookings: 88, verified: true, active: true },
    { id: '3', name: 'Bankey Bihari Mandir', location: 'Vrindavan, UP', deity: 'Krishna', totalBookings: 204, verified: true, active: true },
    { id: '4', name: 'Dakshineswar Kali Temple', location: 'Kolkata, WB', deity: 'Kali', totalBookings: 110, verified: false, active: true },
    { id: '5', name: 'Tirupati Balaji Mandir', location: 'Tirumala, AP', deity: 'Vishnu', totalBookings: 315, verified: true, active: true },
    { id: '6', name: 'Hanuman Garhi', location: 'Ayodhya, UP', deity: 'Hanuman', totalBookings: 75, verified: false, active: false },
  ]);

  const [pandits, setPandits] = useState<MockPandit[]>([
    { id: '1', name: 'Pt. Alok Shastri', phone: '+91 98765 43210', specialization: 'Satyanarayan, Vastu', rating: 4.9, active: true, status: 'available' },
    { id: '2', name: 'Pt. Ramesh Dwivedi', phone: '+91 87654 32109', specialization: 'Rudrabhishek, Hawan', rating: 4.8, active: true, status: 'busy' },
    { id: '3', name: 'Pt. Pranab Banerjee', phone: '+91 76543 21098', specialization: 'Kali Puja, Durga Path', rating: 4.9, active: true, status: 'available' },
    { id: '4', name: 'Pt. Hari Prasad', phone: '+91 65432 10987', specialization: 'Griha Pravesh, Naamkaran', rating: 4.7, active: true, status: 'available' },
    { id: '5', name: 'Pt. Manoj Vyas', phone: '+91 95432 90876', specialization: 'Pitru Tarpan, Shradh', rating: 4.6, active: false, status: 'available' },
  ]);

  // Input states for Prasad dispatching
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [courierPartner, setCourierPartner] = useState('BlueDart');
  const [trackingNumber, setTrackingNumber] = useState('');

  // Calculations for Overview & Commission
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((acc, curr) => acc + curr.amount, 0);
  const platformCommission = totalRevenue * 0.20; // 20% commission
  const activeUsersCount = 1240;

  // Actions handlers
  const toggleTempleVerification = (id: string) => {
    setTemples(temples.map(t => t.id === id ? { ...t, verified: !t.verified } : t));
  };

  const toggleTempleActive = (id: string) => {
    setTemples(temples.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  const togglePanditActive = (id: string) => {
    setPandits(pandits.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const changeBookingStatus = (id: string, newStatus: any) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const assignPandit = (bookingId: string, name: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, panditName: name, status: 'confirmed' } : b));
  };

  const dispatchPrasad = (bookingId: string) => {
    if (!trackingNumber.trim()) {
      alert('Please enter a valid tracking number');
      return;
    }
    setBookings(bookings.map(b => b.id === bookingId ? { 
      ...b, 
      prasadStatus: 'dispatched', 
      trackingId: trackingNumber, 
      courier: courierPartner 
    } : b));
    setEditingBookingId(null);
    setTrackingNumber('');
    alert(`Prasad successfully dispatched! User will receive an FCM push with courier partner ${courierPartner} and tracking code ${trackingNumber}.`);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <span className="logo-emoji">🛕</span>
          <span className="logo-text">DivineConnect</span>
        </div>
        <ul className="nav-links">
          <li className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}>
            <a href="#overview" onClick={() => setActiveTab('overview')}>
              <span>📊</span> Overview
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}>
            <a href="#bookings" onClick={() => setActiveTab('bookings')}>
              <span>📋</span> Bookings Hub
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'temples' ? 'active' : ''}`}>
            <a href="#temples" onClick={() => setActiveTab('temples')}>
              <span>🕌</span> Temple Directory
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'pandits' ? 'active' : ''}`}>
            <a href="#pandits" onClick={() => setActiveTab('pandits')}>
              <span>🙏</span> Pandit Directory
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'commission' ? 'active' : ''}`}>
            <a href="#commission" onClick={() => setActiveTab('commission')}>
              <span>💰</span> Commission Ledger
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'prasad' ? 'active' : ''}`}>
            <a href="#prasad" onClick={() => setActiveTab('prasad')}>
              <span>📦</span> Prasad Center
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <div className="admin-avatar">DC</div>
          <div className="admin-info">
            <p className="name">Pt. Satish Shastri</p>
            <p className="role">Principal Admin</p>
          </div>
        </div>
      </aside>

      {/* Main Panel Content wrapper */}
      <main className="main-wrapper">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">DivineConnect Admin Console ☀️</h1>
                <p className="page-subtitle">Platform health, booking metrics, and commission splits</p>
              </div>
              <button className="btn btn-primary" onClick={() => alert('Exporting PDF Report...')}>⚡ Export Metrics</button>
            </header>

            {/* KPI statistics cards */}
            <div className="analytics-grid">
              <div className="stat-card">
                <div className="stat-icon">₹</div>
                <div className="stat-title">Gross Spiritual Volume</div>
                <div className="stat-value">₹{totalRevenue.toLocaleString('en-IN')}</div>
                <span className="stat-trend up">▲ 14.2% this week</span>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-title">Platform Commissions (20%)</div>
                <div className="stat-value">₹{platformCommission.toLocaleString('en-IN')}</div>
                <span className="stat-trend up">▲ 12.8% this week</span>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-title">Total Puja Bookings</div>
                <div className="stat-value">{totalBookingsCount}</div>
                <span className="stat-trend up">▲ 8% from last month</span>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👤</div>
                <div className="stat-title">Active Devotees</div>
                <div className="stat-value">{activeUsersCount}</div>
                <span className="stat-trend up">▲ 24 new today</span>
              </div>
            </div>

            {/* Detailed tables inside dual layout */}
            <div className="dashboard-grid">
              
              {/* Recent Bookings Panel */}
              <div className="data-card">
                <div className="card-header">
                  <h3 className="card-title">Recent Puja Bookings</h3>
                  <button className="btn btn-secondary" onClick={() => setActiveTab('bookings')}>View All</button>
                </div>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Devotee</th>
                        <th>Ritual</th>
                        <th>Temple</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 3).map((booking) => (
                        <tr key={booking.id}>
                          <td style={{ fontWeight: 'bold', color: '#E65100' }}>{booking.bookingId}</td>
                          <td>{booking.devoteeName}</td>
                          <td>{booking.ritualName}</td>
                          <td>{booking.templeName}</td>
                          <td>₹{booking.amount}</td>
                          <td>
                            <span className={`badge ${booking.status}`}>{booking.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions / Activity log */}
              <div className="data-card">
                <div className="card-header">
                  <h3 className="card-title">System Activity Log</h3>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ fontSize: '13px', display: 'flex', gap: '10px' }}>
                    <span>🟢</span>
                    <div>
                      <p style={{ fontWeight: 'bold' }}>FCM Push Dispatched</p>
                      <p style={{ color: 'var(--text-secondary)' }}>FCM alert sent to Raman Sharma confirming Satyanarayan Puja.</p>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>2 mins ago</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', display: 'flex', gap: '10px' }}>
                    <span>💳</span>
                    <div>
                      <p style={{ fontWeight: 'bold' }}>Razorpay Signature Verified</p>
                      <p style={{ color: 'var(--text-secondary)' }}>Payment verified for order pay_DC65A1B2 (₹2,100).</p>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>15 mins ago</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', display: 'flex', gap: '10px' }}>
                    <span>🕉️</span>
                    <div>
                      <p style={{ fontWeight: 'bold' }}>New Pandit Registered</p>
                      <p style={{ color: 'var(--text-secondary)' }}>Pt. Manoj Vyas submitted documents for verification.</p>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* BOOKINGS HUB TAB */}
        {activeTab === 'bookings' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Spiritual Booking Control Hub 📿</h1>
                <p className="page-subtitle">Monitor online pujas, assign coordinates, and control state transitions</p>
              </div>
            </header>

            <div className="data-card">
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Devotee Name</th>
                      <th>Ritual Details</th>
                      <th>Mandir / Destination</th>
                      <th>Assigned Pandit</th>
                      <th>Price</th>
                      <th>Status & State Transitions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td style={{ fontWeight: 'bold', color: '#E65100' }}>{booking.bookingId}</td>
                        <td>{booking.devoteeName}</td>
                        <td>
                          <div style={{ fontWeight: '600' }}>{booking.ritualName}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Scheduled: {booking.date}</div>
                        </td>
                        <td>{booking.templeName}</td>
                        <td>
                          {booking.panditName ? (
                            <span style={{ fontWeight: '500' }}>{booking.panditName}</span>
                          ) : (
                            <select 
                              style={{ padding: '6px', fontSize: '12px', border: '1px solid #E5E7EB', borderRadius: '4px' }}
                              onChange={(e) => assignPandit(booking.id, e.target.value)}
                              defaultValue=""
                            >
                              <option value="" disabled>Select Pandit</option>
                              {pandits.filter(p => p.active && p.status === 'available').map(p => (
                                <option key={p.id} value={p.name}>{p.name}</option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td style={{ fontWeight: 'bold' }}>₹{booking.amount}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span className={`badge ${booking.status}`}>{booking.status}</span>
                            
                            <select
                              value={booking.status}
                              onChange={(e) => changeBookingStatus(booking.id, e.target.value as any)}
                              style={{ padding: '6px', fontSize: '12px', border: '1px solid #E5E7EB', borderRadius: '4px' }}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TEMPLE DIRECTORY TAB */}
        {activeTab === 'temples' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Temple Registry & Verified Listings 🕌</h1>
                <p className="page-subtitle">Authorize pilgrimage sites, edit details, and verify credentials</p>
              </div>
              <button className="btn btn-primary" onClick={() => alert('Form to register new Temple coming soon!')}>🛕 Register New Mandir</button>
            </header>

            <div className="data-card">
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Temple Name</th>
                      <th>Location</th>
                      <th>Primary Deity</th>
                      <th>Total Bookings</th>
                      <th>Credentials Status</th>
                      <th>Search Feeds Active</th>
                      <th>System Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {temples.map((temple) => (
                      <tr key={temple.id}>
                        <td style={{ fontWeight: 'bold', fontSize: '15px' }}>{temple.name}</td>
                        <td>📍 {temple.location}</td>
                        <td><span style={{ backgroundColor: '#FFE0B2', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', color: '#E65100' }}>{temple.deity}</span></td>
                        <td style={{ fontWeight: 'bold' }}>{temple.totalBookings} pujas</td>
                        <td>
                          <button 
                            className={`btn ${temple.verified ? 'badge completed' : 'badge cancelled'}`}
                            onClick={() => toggleTempleVerification(temple.id)}
                            style={{ padding: '4px 10px', fontSize: '11px', border: 'none', cursor: 'pointer' }}
                          >
                            {temple.verified ? '✓ Verified Listing' : '✕ Click to Verify'}
                          </button>
                        </td>
                        <td>
                          <button 
                            className={`btn ${temple.active ? 'badge completed' : 'badge pending'}`}
                            onClick={() => toggleTempleActive(temple.id)}
                            style={{ padding: '4px 10px', fontSize: '11px', border: 'none', cursor: 'pointer' }}
                          >
                            {temple.active ? '● Active' : '○ Suspended'}
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => alert(`Editing details for ${temple.name}...`)}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PANDIT DIRECTORY TAB */}
        {activeTab === 'pandits' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Pandit Directory & Schedules 🙏</h1>
                <p className="page-subtitle">Verify Pandit credentials, check availability calendars, and review dakshina splits</p>
              </div>
            </header>

            <div className="data-card">
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Pandit Name</th>
                      <th>Contact Phone</th>
                      <th>Specializations</th>
                      <th>Rating Score</th>
                      <th>Availability Status</th>
                      <th>Account Status</th>
                      <th>System Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pandits.map((pandit) => (
                      <tr key={pandit.id}>
                        <td style={{ fontWeight: 'bold', fontSize: '15px' }}>{pandit.name}</td>
                        <td>{pandit.phone}</td>
                        <td>{pandit.specialization}</td>
                        <td style={{ fontWeight: 'bold', color: '#F59E0B' }}>⭐ {pandit.rating} / 5.0</td>
                        <td>
                          <span className={`badge ${pandit.status === 'available' ? 'completed' : 'pending'}`}>
                            {pandit.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className={`btn ${pandit.active ? 'badge completed' : 'badge pending'}`}
                            onClick={() => togglePanditActive(pandit.id)}
                            style={{ padding: '4px 10px', fontSize: '11px', border: 'none', cursor: 'pointer' }}
                          >
                            {pandit.active ? 'Approved' : 'Suspended'}
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => alert(`Viewing calendar schedule for ${pandit.name}...`)}>View Calendar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* COMMISSION LEDGER TAB */}
        {activeTab === 'commission' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Commission Ledger & Revenue Analytics 💰</h1>
                <p className="page-subtitle">Track the platform's 20% commission on pujas, donations, and travel yatras</p>
              </div>
            </header>

            <div className="analytics-grid">
              <div className="stat-card" style={{ borderLeft: '4px solid var(--saffron)' }}>
                <div className="stat-title">Platform Gross Earnings</div>
                <div className="stat-value">₹{totalRevenue.toLocaleString('en-IN')}</div>
              </div>
              <div className="stat-card" style={{ borderLeft: '4px solid var(--primary-600)' }}>
                <div className="stat-title">DivineConnect Margin (20%)</div>
                <div className="stat-value">₹{platformCommission.toLocaleString('en-IN')}</div>
              </div>
              <div className="stat-card" style={{ borderLeft: '4px solid var(--success)' }}>
                <div className="stat-title">Settled to Mandirs & Pandits (80%)</div>
                <div className="stat-value">₹{(totalRevenue * 0.80).toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="data-card">
              <div className="card-header">
                <h3 className="card-title">Detailed Ledger Statements</h3>
              </div>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Puja / Service Details</th>
                      <th>Total Paid</th>
                      <th>Pandit Share (50%)</th>
                      <th>Temple Share (30%)</th>
                      <th>Platform Commission (20%)</th>
                      <th>Payout Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.filter(b => b.status === 'completed' || b.status === 'confirmed').map((booking) => (
                      <tr key={booking.id}>
                        <td style={{ fontWeight: 'bold' }}>TXN{booking.bookingId}</td>
                        <td>{booking.ritualName} ({booking.templeName})</td>
                        <td style={{ fontWeight: 'bold' }}>₹{booking.amount}</td>
                        <td style={{ color: '#2E7D32' }}>₹{booking.amount * 0.50}</td>
                        <td style={{ color: '#0288D1' }}>₹{booking.amount * 0.30}</td>
                        <td style={{ fontWeight: 'bold', color: '#E65100' }}>₹{booking.amount * 0.20}</td>
                        <td><span className="badge completed">Auto-Settled</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PRASAD CENTER TAB */}
        {activeTab === 'prasad' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Prasad Dispatch Center 📦</h1>
                <p className="page-subtitle">Input courier tracking codes to trigger FCM alerts, gotra updates, and dispatch confirmations</p>
              </div>
            </header>

            <div className="data-card">
              <div className="card-header">
                <h3 className="card-title">Completed Pujas Awaiting Prasad Dispatch</h3>
              </div>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Devotee Name</th>
                      <th>Completed Ritual</th>
                      <th>Prasad Courier Partner</th>
                      <th>Courier Tracking Code</th>
                      <th>Prasad Status</th>
                      <th>Dispatch Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.filter(b => b.status === 'completed' || b.status === 'confirmed').map((booking) => (
                      <tr key={booking.id}>
                        <td style={{ fontWeight: 'bold', color: '#E65100' }}>{booking.bookingId}</td>
                        <td>{booking.devoteeName}</td>
                        <td>{booking.ritualName}</td>
                        <td>
                          {editingBookingId === booking.id ? (
                            <select 
                              value={courierPartner} 
                              onChange={(e) => setCourierPartner(e.target.value)}
                              style={{ padding: '6px', border: '1px solid #E5E7EB', borderRadius: '4px' }}
                            >
                              <option value="BlueDart">BlueDart</option>
                              <option value="DTDC">DTDC</option>
                              <option value="Delhivery">Delhivery</option>
                              <option value="IndiaPost">India Post (Speed)</option>
                            </select>
                          ) : (
                            <span>{booking.courier || '—'}</span>
                          )}
                        </td>
                        <td>
                          {editingBookingId === booking.id ? (
                            <input 
                              type="text" 
                              placeholder="Enter tracking code" 
                              value={trackingNumber}
                              onChange={(e) => setTrackingNumber(e.target.value)}
                              style={{ padding: '6px', border: '1px solid #E5E7EB', borderRadius: '4px', fontSize: '13px' }}
                            />
                          ) : (
                            <span style={{ fontFamily: 'monospace' }}>{booking.trackingId || '—'}</span>
                          )}
                        </td>
                        <td>
                          <span style={{ 
                            backgroundColor: booking.prasadStatus === 'delivered' ? '#D1FAE5' : booking.prasadStatus === 'dispatched' ? '#DBEAFE' : '#FEF3C7', 
                            color: booking.prasadStatus === 'delivered' ? '#047857' : booking.prasadStatus === 'dispatched' ? '#1D4ED8' : '#D97706',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: 'bold'
                          }}>
                            {booking.prasadStatus || 'processing'}
                          </span>
                        </td>
                        <td>
                          {booking.prasadStatus === 'delivered' ? (
                            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓ Handed Over</span>
                          ) : editingBookingId === booking.id ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => dispatchPrasad(booking.id)}>Confirm</button>
                              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setEditingBookingId(null)}>Cancel</button>
                            </div>
                          ) : (
                            <button 
                              className="btn btn-primary" 
                              style={{ padding: '6px 12px', fontSize: '12px' }}
                              onClick={() => {
                                setEditingBookingId(booking.id);
                                setCourierPartner(booking.courier || 'BlueDart');
                                setTrackingNumber(booking.trackingId || '');
                              }}
                            >
                              🚀 Dispatch Prasad
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
