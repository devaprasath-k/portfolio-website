import { useEffect, useState, useCallback, Fragment } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaTachometerAlt, FaFolderOpen, FaEnvelopeOpenText, FaChartBar,
  FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaTimes, FaCertificate,
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../../utils/api.js';
import Logo from '../Logo.jsx';
import './Admin.css';

const COLORS = ['#8B5CF6', '#00E0FF', '#A855F7', '#4B5563', '#F87171'];

function useAuthGuard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) navigate('/admin/login');
  }, [navigate]);
}

function AdminNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/admin/dashboard/projects', label: 'Projects', icon: <FaFolderOpen /> },
    { to: '/admin/dashboard/certificates', label: 'Certificates', icon: <FaCertificate /> },
    { to: '/admin/dashboard/messages', label: 'Messages', icon: <FaEnvelopeOpenText /> },
  ];
  return (
    <aside className="admin-sidebar glass">
      <div className="admin-sidebar-top"><Logo size={44} /></div>
      <nav>
        {items.map((item) => (
          <Link key={item.to} to={item.to} className={`admin-link ${location.pathname === item.to ? 'active' : ''}`}>
            {item.icon} <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <button
        className="admin-link logout"
        onClick={() => { localStorage.removeItem('admin_token'); navigate('/admin/login'); }}
      >
        <FaSignOutAlt /> <span>Logout</span>
      </button>
    </aside>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="stat-card card-surface">
      <div className="stat-icon">{icon}</div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="text-dim stat-label">{label}</div>
      </div>
    </div>
  );
}

// Groups messages by the date they were created, for the last 7 days —
// turns raw message timestamps into real chart data instead of fake numbers.
function messagesByDay(messages) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ key: d.toDateString(), label: d.toLocaleDateString(undefined, { weekday: 'short' }), count: 0 });
  }
  messages.forEach((m) => {
    const key = new Date(m.createdAt).toDateString();
    const day = days.find((d) => d.key === key);
    if (day) day.count += 1;
  });
  return days;
}

function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ projects: 0, messages: 0, certificates: 0, visitors: 0 });
  const [byCountry, setByCountry] = useState([]);
  const [dailyMessages, setDailyMessages] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [projectsRes, messagesRes, certificatesRes, visitorRes] = await Promise.all([
          api.get('/projects'),
          api.get('/messages'),
          api.get('/certificates'),
          api.get('/visitors/stats'),
        ]);
        if (cancelled) return;
        setStats({
          projects: projectsRes.data.length,
          messages: messagesRes.data.length,
          certificates: certificatesRes.data.length,
          visitors: visitorRes.data.total,
        });
        setByCountry(
          visitorRes.data.byCountry.map((c) => ({ name: c._id || 'Unknown', value: c.count }))
        );
        setDailyMessages(messagesByDay(messagesRes.data));
      } catch (err) {
        toast.error('Failed to load dashboard data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <p className="text-dim">Loading dashboard…</p>;

  return (
    <>
      <div className="stats-row">
        <StatCard label="Total Projects" value={stats.projects} icon={<FaFolderOpen />} />
        <StatCard label="Messages" value={stats.messages} icon={<FaEnvelopeOpenText />} />
        <StatCard label="Certificates" value={stats.certificates} icon={<FaCertificate />} />
        <StatCard label="Visitors" value={stats.visitors} icon={<FaTachometerAlt />} />
      </div>
      <div className="charts-row">
        <div className="card-surface chart-card">
          <h4>Messages — Last 7 Days</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyMessages}>
              <XAxis dataKey="label" stroke="#a1a8c3" fontSize={12} />
              <YAxis stroke="#a1a8c3" fontSize={12} allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #8B5CF6' }} />
              <Line type="monotone" dataKey="count" stroke="#00E0FF" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card-surface chart-card">
          <h4>Visitors by Country</h4>
          {byCountry.length === 0 ? (
            <p className="text-dim" style={{ padding: '40px 0', textAlign: 'center' }}>No visitor data logged yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={byCountry} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70}>
                  {byCountry.map((entry, i) => <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #8B5CF6' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  );
}

const emptyProject = { name: '', short: '', tech: '', github: '', demo: '' };

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const openAdd = () => { setForm(emptyProject); setEditingId(null); setShowForm(true); };
  const openEdit = (p) => {
    setForm({ name: p.name, short: p.short, tech: (p.tech || []).join(', '), github: p.github || '', demo: p.demo || '' });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean) };
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
        toast.success('Project updated');
      } else {
        await api.post('/projects', payload);
        toast.success('Project added');
      }
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="card-surface admin-panel">
      <div className="admin-panel-header">
        <h4>Manage Projects</h4>
        <button className="btn-primary-glow small" onClick={openAdd}><FaPlus /> Add Project</button>
      </div>

      {showForm && (
        <form className="admin-inline-form" onSubmit={handleSubmit}>
          <input placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Short description" value={form.short} onChange={(e) => setForm({ ...form, short: e.target.value })} required />
          <input placeholder="Tech (comma separated)" value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} />
          <input placeholder="GitHub URL" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
          <input placeholder="Live demo URL" value={form.demo} onChange={(e) => setForm({ ...form, demo: e.target.value })} />
          <div className="admin-inline-form-actions">
            <button type="submit" className="btn-primary-glow small">{editingId ? 'Update' : 'Create'}</button>
            <button type="button" className="icon-btn" onClick={() => setShowForm(false)}><FaTimes /> Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-dim">Loading…</p>
      ) : projects.length === 0 ? (
        <p className="text-dim">No projects yet — add your first one above.</p>
      ) : (
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Technologies</th><th>Action</th></tr></thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{(p.tech || []).join(', ')}</td>
                <td className="admin-actions">
                  <button className="icon-btn" onClick={() => openEdit(p)}><FaEdit /></button>
                  <button className="icon-btn danger" onClick={() => handleDelete(p._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const emptyCert = { title: '', issuer: '', verifyLink: '' };

function ManageCertificates() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyCert);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/certificates');
      setItems(data);
    } catch (err) {
      toast.error('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openAdd = () => { setForm(emptyCert); setEditingId(null); setShowForm(true); };
  const openEdit = (c) => { setForm({ title: c.title, issuer: c.issuer, verifyLink: c.verifyLink || '' }); setEditingId(c._id); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/certificates/${editingId}`, form);
        toast.success('Certificate updated');
      } else {
        await api.post('/certificates', form);
        toast.success('Certificate added');
      }
      setShowForm(false);
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      await api.delete(`/certificates/${id}`);
      toast.success('Certificate deleted');
      fetchItems();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="card-surface admin-panel">
      <div className="admin-panel-header">
        <h4>Manage Certificates</h4>
        <button className="btn-primary-glow small" onClick={openAdd}><FaPlus /> Add Certificate</button>
      </div>

      {showForm && (
        <form className="admin-inline-form" onSubmit={handleSubmit}>
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input placeholder="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} required />
          <input placeholder="Verify link" value={form.verifyLink} onChange={(e) => setForm({ ...form, verifyLink: e.target.value })} />
          <div className="admin-inline-form-actions">
            <button type="submit" className="btn-primary-glow small">{editingId ? 'Update' : 'Create'}</button>
            <button type="button" className="icon-btn" onClick={() => setShowForm(false)}><FaTimes /> Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-dim">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-dim">No certificates yet — add your first one above.</p>
      ) : (
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Issuer</th><th>Action</th></tr></thead>
          <tbody>
            {items.map((c) => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.issuer}</td>
                <td className="admin-actions">
                  <button className="icon-btn" onClick={() => openEdit(c)}><FaEdit /></button>
                  <button className="icon-btn danger" onClick={() => handleDelete(c._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/messages');
      setMessages(data);
    } catch (err) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleView = async (m) => {
    setExpandedId(expandedId === m._id ? null : m._id);
    if (!m.read) {
      try {
        await api.put(`/messages/${m._id}/read`);
        setMessages((prev) => prev.map((x) => (x._id === m._id ? { ...x, read: true } : x)));
      } catch (err) { /* non-critical, ignore */ }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/messages/${id}`);
      toast.success('Message deleted');
      fetchMessages();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="card-surface admin-panel">
      <h4>Messages</h4>
      {loading ? (
        <p className="text-dim">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="text-dim">No messages yet.</p>
      ) : (
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>
            {messages.map((m) => (
              <Fragment key={m._id}>
                <tr style={{ fontWeight: m.read ? 400 : 700 }}>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.subject}</td>
                  <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td className="admin-actions">
                    <button className="icon-btn" onClick={() => handleView(m)}>{expandedId === m._id ? 'Hide' : 'View'}</button>
                    <button className="icon-btn danger" onClick={() => handleDelete(m._id)}><FaTrash /></button>
                  </td>
                </tr>
                {expandedId === m._id && (
                  <tr>
                    <td colSpan={5} style={{ background: 'var(--card-light)' }}>{m.message}</td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  useAuthGuard();
  return (
    <div className="admin-shell">
      <AdminNav />
      <main className="admin-main">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="certificates" element={<ManageCertificates />} />
          <Route path="messages" element={<Messages />} />
        </Routes>
      </main>
    </div>
  );
}
