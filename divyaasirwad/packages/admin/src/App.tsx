import React, { useState, useCallback, useEffect } from 'react';

interface Toast { id: number; message: string; type: 'success' | 'error' | 'info'; }

let toastId = 0;

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
  }, []);
  return { toasts, addToast };
}

interface MockBooking {
  id: string; bookingId: string; devoteeName: string; ritualName: string;
  templeName: string; amount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  date: string; panditName?: string;
  prasadStatus?: 'processing' | 'dispatched' | 'delivered';
  trackingId?: string; courier?: string;
}

interface MockTemple { id: string; name: string; location: string; deity: string; totalBookings: number; verified: boolean; active: boolean; }

interface MockPandit { id: string; name: string; phone: string; specialization: string; rating: number; active: boolean; status: 'available' | 'busy'; }

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  if (toasts.length === 0) return null;
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>{t.message}</div>
      ))}
    </div>
  );
}

export default function App() {
  const { toasts, addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'temples' | 'pandits' | 'commission' | 'prasad'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeSidebar(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeSidebar]);

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

  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [courierPartner, setCourierPartner] = useState('BlueDart');
  const [trackingNumber, setTrackingNumber] = useState('');

  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((acc, curr) => acc + curr.amount, 0);
  const platformCommission = totalRevenue * 0.20;
  const activeUsersCount = 1240;

  const toggleTempleVerification = (id: string) => {
    setTemples(temples.map(t => t.id === id ? { ...t, verified: !t.verified } : t));
    const t = temples.find(t => t.id === id);
    addToast(`${t?.name} ${t?.verified ? 'unverified' : 'verified'} successfully`, t?.verified ? 'error' : 'success');
  };

  const toggleTempleActive = (id: string) => {
    setTemples(temples.map(t => t.id === id ? { ...t, active: !t.active } : t));
    const t = temples.find(t => t.id === id);
    addToast(`${t?.name} ${t?.active ? 'suspended' : 'activated'}`, t?.active ? 'error' : 'success');
  };

  const togglePanditActive = (id: string) => {
    setPandits(pandits.map(p => p.id === id ? { ...p, active: !p.active } : p));
    const p = pandits.find(p => p.id === id);
    addToast(`${p?.name} ${p?.active ? 'suspended' : 'approved'}`, p?.active ? 'error' : 'success');
  };

  const changeBookingStatus = (id: string, newStatus: any) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    addToast(`Booking #${bookings.find(b => b.id === id)?.bookingId} → ${newStatus}`, 'info');
  };

  const assignPandit = (bookingId: string, name: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, panditName: name, status: 'confirmed' } : b));
    addToast(`Pandit ${name} assigned to booking`, 'success');
  };

  const dispatchPrasad = (bookingId: string) => {
    if (!trackingNumber.trim()) {
      addToast('Please enter a valid tracking number', 'error');
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
    addToast(`Prasad dispatched via ${courierPartner} (${trackingNumber})`, 'success');
  };

  const navItems = [
    { key: 'overview', icon: '📊', label: 'Overview' },
    { key: 'bookings', icon: '📋', label: 'Bookings Hub' },
    { key: 'temples', icon: '🕌', label: 'Temple Directory' },
    { key: 'pandits', icon: '🙏', label: 'Pandit Directory' },
    { key: 'commission', icon: '💰', label: 'Commission Ledger' },
    { key: 'prasad', icon: '📦', label: 'Prasad Center' },
  ] as const;

  return (
    <div className="admin-layout">
      <ToastContainer toasts={toasts} />

      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={closeSidebar} />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <span className="logo-emoji">🛕</span>
          <span className="logo-text">DivineConnect</span>
        </div>
        <ul className="nav-links">
          {navItems.map(({ key, icon, label }) => (
            <li key={key} className={`nav-item ${activeTab === key ? 'active' : ''}`}>
              <a href={`#${key}`} onClick={(e) => { e.preventDefault(); setActiveTab(key); closeSidebar(); }}>
                <span>{icon}</span> {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <div className="admin-avatar">DC</div>
          <div className="admin-info">
            <p className="name">Pt. Satish Shastri</p>
            <p className="role">Principal Admin</p>
          </div>
        </div>
      </aside>

      <main className="main-wrapper">
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
          ☰
        </button>

        {activeTab === 'overview' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">DivineConnect Admin Console ☀️</h1>
                <p className="page-subtitle">Platform health, booking metrics, and commission splits</p>
              </div>
              <button className="btn btn-primary" onClick={() => addToast('PDF report exported', 'success')}>⚡ Export Metrics</button>
            </header>

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

            <div className="dashboard-grid">
              <div className="data-card">
                <div className="card-header">
                  <h3 className="card-title">Recent Puja Bookings</h3>
                  <button className="btn btn-secondary" onClick={() => setActiveTab('bookings')}>View All</button>
                </div>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th><th>Devotee</th><th>Ritual</th><th>Temple</th><th>Amount</th><th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 3).map((booking) => (
                        <tr key={booking.id}>
                          <td className="td-book-id">{booking.bookingId}</td>
                          <td>{booking.devoteeName}</td>
                          <td>{booking.ritualName}</td>
                          <td>{booking.templeName}</td>
                          <td>₹{booking.amount}</td>
                          <td><span className={`badge ${booking.status}`}>{booking.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="data-card">
                <div className="card-header">
                  <h3 className="card-title">System Activity Log</h3>
                </div>
                <div className="flex flex-col gap-16 p-20">
                  <div className="activity-item">
                    <span>🟢</span>
                    <div>
                      <p className="activity-title">FCM Push Dispatched</p>
                      <p className="activity-text">FCM alert sent to Raman Sharma confirming Satyanarayan Puja.</p>
                      <span className="activity-time">2 mins ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span>💳</span>
                    <div>
                      <p className="activity-title">Razorpay Signature Verified</p>
                      <p className="activity-text">Payment verified for order pay_DC65A1B2 (₹2,100).</p>
                      <span className="activity-time">15 mins ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span>🕉️</span>
                    <div>
                      <p className="activity-title">New Pandit Registered</p>
                      <p className="activity-text">Pt. Manoj Vyas submitted documents for verification.</p>
                      <span className="activity-time">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                      <th>Booking ID</th><th>Devotee</th><th>Ritual</th><th>Temple</th><th>Pandit</th><th>Amount</th><th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="td-book-id">{booking.bookingId}</td>
                        <td>{booking.devoteeName}</td>
                        <td>
                          <div className="text-semibold">{booking.ritualName}</div>
                          <div className="text-xs text-muted">Scheduled: {booking.date}</div>
                        </td>
                        <td>{booking.templeName}</td>
                        <td>
                          {booking.panditName ? (
                            <span className="text-medium">{booking.panditName}</span>
                          ) : (
                            <select className="form-select" onChange={(e) => assignPandit(booking.id, e.target.value)} defaultValue="">
                              <option value="" disabled>Select Pandit</option>
                              {pandits.filter(p => p.active && p.status === 'available').map(p => (
                                <option key={p.id} value={p.name}>{p.name}</option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td className="td-bold">₹{booking.amount}</td>
                        <td>
                          <div className="flex items-center gap-10">
                            <span className={`badge ${booking.status}`}>{booking.status}</span>
                            <select className="form-select" value={booking.status} onChange={(e) => changeBookingStatus(booking.id, e.target.value)}>
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

        {activeTab === 'temples' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Temple Registry & Verified Listings 🕌</h1>
                <p className="page-subtitle">Authorize pilgrimage sites, edit details, and verify credentials</p>
              </div>
              <button className="btn btn-primary" onClick={() => addToast('New temple registration form coming soon!', 'info')}>🛕 Register New Mandir</button>
            </header>

            <div className="data-card">
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Temple Name</th><th>Location</th><th>Primary Deity</th><th>Total Bookings</th><th>Credentials</th><th>Active</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {temples.map((temple) => (
                      <tr key={temple.id}>
                        <td className="text-bold">{temple.name}</td>
                        <td>📍 {temple.location}</td>
                        <td><span className="deity-badge">{temple.deity}</span></td>
                        <td className="td-bold">{temple.totalBookings} pujas</td>
                        <td>
                          <button className={`btn ${temple.verified ? 'badge completed' : 'badge cancelled'} action-btn`} onClick={() => toggleTempleVerification(temple.id)}>
                            {temple.verified ? '✓ Verified' : '✕ Click to Verify'}
                          </button>
                        </td>
                        <td>
                          <button className={`btn ${temple.active ? 'badge completed' : 'badge pending'} action-btn`} onClick={() => toggleTempleActive(temple.id)}>
                            {temple.active ? '● Active' : '○ Suspended'}
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-secondary action-btn" onClick={() => addToast(`Editing ${temple.name}...`, 'info')}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pandits' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Pandit Directory & Schedules 🙏</h1>
                <p className="page-subtitle">Verify Pandit credentials, check availability, and review dakshina splits</p>
              </div>
            </header>

            <div className="data-card">
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Pandit Name</th><th>Contact</th><th>Specializations</th><th>Rating</th><th>Status</th><th>Account</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pandits.map((pandit) => (
                      <tr key={pandit.id}>
                        <td className="text-bold">{pandit.name}</td>
                        <td>{pandit.phone}</td>
                        <td>{pandit.specialization}</td>
                        <td className="td-rating">⭐ {pandit.rating} / 5.0</td>
                        <td>
                          <span className={`badge ${pandit.status === 'available' ? 'completed' : 'pending'}`}>{pandit.status}</span>
                        </td>
                        <td>
                          <button className={`btn ${pandit.active ? 'badge completed' : 'badge pending'} action-btn`} onClick={() => togglePanditActive(pandit.id)}>
                            {pandit.active ? 'Approved' : 'Suspended'}
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-secondary action-btn" onClick={() => addToast(`Viewing calendar for ${pandit.name}...`, 'info')}>View Calendar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'commission' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Commission Ledger & Revenue Analytics 💰</h1>
                <p className="page-subtitle">Track the platform's 20% commission on pujas, donations, and yatras</p>
              </div>
            </header>

            <div className="analytics-grid">
              <div className="stat-card stat-card-accent-saffron">
                <div className="stat-title">Platform Gross Earnings</div>
                <div className="stat-value">₹{totalRevenue.toLocaleString('en-IN')}</div>
              </div>
              <div className="stat-card stat-card-accent-primary">
                <div className="stat-title">DivineConnect Margin (20%)</div>
                <div className="stat-value">₹{platformCommission.toLocaleString('en-IN')}</div>
              </div>
              <div className="stat-card stat-card-accent-success">
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
                      <th>Transaction ID</th><th>Service</th><th>Total</th><th>Pandit (50%)</th><th>Temple (30%)</th><th>Platform (20%)</th><th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.filter(b => b.status === 'completed' || b.status === 'confirmed').map((booking) => (
                      <tr key={booking.id}>
                        <td className="td-bold">TXN{booking.bookingId}</td>
                        <td>{booking.ritualName} ({booking.templeName})</td>
                        <td className="td-bold">₹{booking.amount}</td>
                        <td className="td-revenue-green">₹{booking.amount * 0.50}</td>
                        <td className="td-revenue-blue">₹{booking.amount * 0.30}</td>
                        <td className="td-revenue-saffron">₹{booking.amount * 0.20}</td>
                        <td><span className="badge completed">Auto-Settled</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prasad' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Prasad Dispatch Center 📦</h1>
                <p className="page-subtitle">Input courier tracking codes to trigger FCM alerts and dispatch confirmations</p>
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
                      <th>Booking ID</th><th>Devotee</th><th>Ritual</th><th>Courier</th><th>Tracking</th><th>Status</th><th>Dispatch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.filter(b => b.status === 'completed' || b.status === 'confirmed').map((booking) => (
                      <tr key={booking.id}>
                        <td className="td-book-id">{booking.bookingId}</td>
                        <td>{booking.devoteeName}</td>
                        <td>{booking.ritualName}</td>
                        <td>
                          {editingBookingId === booking.id ? (
                            <select className="form-select" value={courierPartner} onChange={(e) => setCourierPartner(e.target.value)}>
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
                            <input className="form-input" type="text" placeholder="Enter tracking code" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
                          ) : (
                            <span className="mono">{booking.trackingId || '—'}</span>
                          )}
                        </td>
                        <td>
                          <span className={`prasad-badge ${booking.prasadStatus || 'processing'}`}>
                            {booking.prasadStatus || 'processing'}
                          </span>
                        </td>
                        <td>
                          {booking.prasadStatus === 'delivered' ? (
                            <span className="prasad-delivered">✓ Handed Over</span>
                          ) : editingBookingId === booking.id ? (
                            <div className="flex gap-8">
                              <button className="btn btn-primary action-btn" onClick={() => dispatchPrasad(booking.id)}>Confirm</button>
                              <button className="btn btn-secondary action-btn" onClick={() => setEditingBookingId(null)}>Cancel</button>
                            </div>
                          ) : (
                            <button className="btn btn-primary action-btn" onClick={() => {
                              setEditingBookingId(booking.id);
                              setCourierPartner(booking.courier || 'BlueDart');
                              setTrackingNumber(booking.trackingId || '');
                            }}>
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
