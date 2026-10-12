import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  LogOut,
  Search,
  Mail,
  Trash2,
  CheckCircle,
  Eye,
  RefreshCw,
  AlertCircle,
  Clock,
  User,
  Phone,
  Inbox,
  X,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getAdminContacts,
  updateAdminContactStatus,
  deleteAdminContact,
} from '../services/api';
import Toast from '../components/Toast';

const AdminDashboard = () => {
  const { admin, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [deletingId, setDeletingId] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter !== 'all') params.status = statusFilter;

      const res = await getAdminContacts(params);
      if (res && res.success) {
        setContacts(res.data);
        if (res.stats) {
          setStats(res.stats);
        }
      }
    } catch (err) {
      setToast({
        show: true,
        message: err.message || 'Failed to fetch messages.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchContacts();
  };

  const handleToggleRead = async (contact) => {
    try {
      const res = await updateAdminContactStatus(contact._id, !contact.isRead);
      if (res && res.success) {
        setContacts((prev) =>
          prev.map((c) => (c._id === contact._id ? { ...c, isRead: !c.isRead } : c))
        );
        setStats((prev) => ({
          ...prev,
          unread: contact.isRead ? prev.unread + 1 : Math.max(0, prev.unread - 1),
          read: contact.isRead ? Math.max(0, prev.read - 1) : prev.read + 1,
        }));
        if (selectedMessage && selectedMessage._id === contact._id) {
          setSelectedMessage((prev) => ({ ...prev, isRead: !contact.isRead }));
        }
        setToast({
          show: true,
          message: `Message marked as ${!contact.isRead ? 'read' : 'unread'}.`,
          type: 'success',
        });
      }
    } catch (err) {
      setToast({ show: true, message: err.message, type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      setDeletingId(id);
      const res = await deleteAdminContact(id);
      if (res && res.success) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        fetchContacts();
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
        setToast({ show: true, message: 'Message deleted successfully.', type: 'success' });
      }
    } catch (err) {
      setToast({ show: true, message: err.message, type: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenDetails = async (contact) => {
    setSelectedMessage(contact);
    if (!contact.isRead) {
      // Auto mark as read on opening
      handleToggleRead(contact);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <div className="container">
        {/* Header Bar */}
        <div className="admin-header-row">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem' }}>
              <span className="section-badge" style={{ margin: 0, padding: '2px 8px', fontSize: '0.75rem' }}>
                <Shield size={12} /> Management Portal
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Logged in as <strong>{admin?.name || 'Admin'}</strong>
              </span>
            </div>
            <h1 style={{ fontSize: '1.85rem' }}>Contact Messages</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/" className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.88rem' }}>
              <ArrowLeft size={16} /> View Site
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ padding: '0.6rem 1rem', fontSize: '0.88rem' }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="admin-stats-row">
          <div className="admin-stat-box">
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Inquiries</p>
              <h3 style={{ fontSize: '1.75rem', marginTop: '4px' }}>{stats.total}</h3>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--badge-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
              <Inbox size={22} />
            </div>
          </div>

          <div className="admin-stat-box">
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Unread Inquiries</p>
              <h3 style={{ fontSize: '1.75rem', marginTop: '4px', color: '#f59e0b' }}>{stats.unread}</h3>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <Mail size={22} />
            </div>
          </div>

          <div className="admin-stat-box">
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Read &amp; Responded</p>
              <h3 style={{ fontSize: '1.75rem', marginTop: '4px', color: '#10b981' }}>{stats.read}</h3>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <CheckCircle size={22} />
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="admin-toolbar">
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setStatusFilter('all')}
              className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter('unread')}
              className={`filter-btn ${statusFilter === 'unread' ? 'active' : ''}`}
            >
              Unread ({stats.unread})
            </button>
            <button
              onClick={() => setStatusFilter('read')}
              className={`filter-btn ${statusFilter === 'read' ? 'active' : ''}`}
            >
              Read ({stats.read})
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '360px', width: '100%' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search by name, email, subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '2.4rem', fontSize: '0.88rem' }}
              />
              <Search
                size={16}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 0.9rem' }}>
              Filter
            </button>
            <button
              type="button"
              onClick={() => { setSearch(''); fetchContacts(); }}
              className="btn btn-secondary"
              style={{ padding: '0.6rem 0.85rem' }}
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
          </form>
        </div>

        {/* Messages List / Table */}
        <div className="admin-table-container">
          {loading ? (
            <div style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading messages from database...
            </div>
          ) : contacts.length === 0 ? (
            <div style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No messages found matching your criteria.
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Date &amp; Time</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id} className={!c.isRead ? 'unread' : ''}>
                    <td>
                      <button
                        onClick={() => handleToggleRead(c)}
                        title={c.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.78rem',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: c.isRead ? 'var(--badge-bg)' : 'rgba(245, 158, 11, 0.15)',
                          color: c.isRead ? 'var(--text-muted)' : '#f59e0b',
                          fontWeight: 600,
                        }}
                      >
                        {c.isRead ? <CheckCircle size={13} /> : <Mail size={13} />}
                        {c.isRead ? 'Read' : 'Unread'}
                      </button>
                    </td>
                    <td>
                      <div>
                        <strong>{c.name}</strong>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.email}</div>
                    </td>
                    <td>
                      <span style={{ maxWidth: '280px', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.subject || 'General Inquiry'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>
                      {new Date(c.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => handleOpenDetails(c)}
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                          title="View Message"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="btn btn-outline"
                          style={{ padding: '4px 8px', fontSize: '0.8rem', color: '#ef4444' }}
                          title="Delete Message"
                          disabled={deletingId === c._id}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <button className="modal-close-btn" onClick={() => setSelectedMessage(null)}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <span className="section-badge" style={{ margin: 0, padding: '2px 8px', fontSize: '0.75rem' }}>
                Message Details
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {new Date(selectedMessage.createdAt).toLocaleString('en-IN')}
              </span>
            </div>

            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>
              {selectedMessage.subject || 'General Inquiry'}
            </h2>

            <div style={{ background: 'var(--bg-tertiary)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <User size={16} color="#3b82f6" /> <strong>Sender:</strong> {selectedMessage.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <Mail size={16} color="#3b82f6" /> <strong>Email:</strong>{' '}
                <a href={`mailto:${selectedMessage.email}`} style={{ color: 'var(--text-highlight)' }}>
                  {selectedMessage.email}
                </a>
              </div>
              {selectedMessage.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                  <Phone size={16} color="#3b82f6" /> <strong>Phone:</strong>{' '}
                  <a href={`tel:${selectedMessage.phone}`} style={{ color: 'var(--text-highlight)' }}>
                    {selectedMessage.phone}
                  </a>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Message Content
              </h4>
              <div
                style={{
                  background: 'var(--card-bg-solid)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedMessage.message}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--card-border)', paddingTop: '1.25rem' }}>
              <button
                onClick={() => handleDelete(selectedMessage._id)}
                className="btn btn-outline"
                style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '0.55rem 1rem' }}
              >
                <Trash2 size={16} /> Delete
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Inquiry')}`}
                  className="btn btn-primary"
                  style={{ padding: '0.55rem 1.1rem' }}
                >
                  <Mail size={16} /> Reply via Email
                </a>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="btn btn-secondary"
                  style={{ padding: '0.55rem 1rem' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className="toast-container">
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
