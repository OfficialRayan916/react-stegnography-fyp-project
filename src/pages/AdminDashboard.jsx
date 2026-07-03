import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

// ── Inline SVG Icon helper ───────────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

// ── Icon path constants ──────────────────────────────────────────────────────
const ICONS = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  image: "M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4l2 3h8a2 2 0 012 2z",
  audio: "M9 18V5l12-2v13M6 21a3 3 0 100-6 3 3 0 000 6zM18 19a3 3 0 100-6 3 3 0 000 6z",
  video: "M15 10l4.553-2.07A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.94L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z",
  history: "M12 8v4l3 3M3.05 11a9 9 0 1017.9 0",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09c0 .68.39 1.29 1 1.51.62.26 1.34.13 1.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06c-.46.48-.59 1.2-.33 1.82.22.61.83 1 1.51 1H21a2 2 0 010 4h-.09c-.68 0-1.29.39-1.51 1z",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  server: "M22 12.5V8a2 2 0 00-2-2H4a2 2 0 00-2 2v4.5M22 12.5V16a2 2 0 01-2 2H4a2 2 0 01-2-2v-3.5M22 12.5H2M6 6.5h.01M6 14.5h.01",
  arrowUp: "M5 12l7-7 7 7M12 5v15",
  arrowDown: "M19 12l-7 7-7-7M12 19V4",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
  flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
  alert: "M10.29 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
};

// ── Static nav / data ─────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "admin", label: "Admin Overview", icon: ICONS.dashboard, to: "/admin" },
  { key: "users", label: "Users", icon: ICONS.users, to: "/admin-user" },
  { key: "imagestego", label: "Image Stegnography", icon: ICONS.image, to: "/imageStego" },
  { key: "audiostego", label: "Audio Stegnography", icon: ICONS.audio, to: "/audioStego" },
  { key: "videostego", label: "Video Stegnography", icon: ICONS.video, to: "/videoStego" },
  { key: "history", label: "History", icon: ICONS.history, to: "/admin-history" },
  { key: "settings", label: "Settings", icon: ICONS.settings, to: "/admin/settings" },
];

const QUICK_ACTIONS = [
  { label: "Export Report", sub: "Download CSV summary", icon: ICONS.download },
  { label: "Flag Review Queue", sub: "3 items pending", icon: ICONS.flag },
  { label: "System Health", sub: "All systems normal", icon: ICONS.server },
];

const SECURITY_ITEMS = [
  { label: "Encryption", value: "AES-256", icon: ICONS.shield },
  { label: "Failed Logins (24h)", value: "2", icon: ICONS.alert },
  { label: "Server Uptime", value: "99.98%", icon: ICONS.server },
];

// ── Mock fallback data (used if API not reachable) ───────────────────────────
const FALLBACK_STATS = {
  total_users: 1256,
  total_encodes: 3456,
  total_decodes: 2789,
  active_sessions: 342,
  delta_users: 18,
  delta_encodes: 12,
  delta_decodes: 19,
  delta_sessions: 6,
  images_processed: 45,
  audio_processed: 30,
  video_processed: 25,
  daily_activity: [
    { day: "May 18", encode: 240, decode: 180 },
    { day: "May 19", encode: 300, decode: 220 },
    { day: "May 20", encode: 280, decode: 260 },
    { day: "May 21", encode: 380, decode: 300 },
    { day: "May 22", encode: 340, decode: 280 },
    { day: "May 23", encode: 420, decode: 360 },
    { day: "May 24", encode: 460, decode: 400 },
  ],
};

const FALLBACK_ACTIVITIES = [
  { user: "Sarah Khan", email: "sarah.khan@mail.com", operation: "encode", file_type: "image", status: "success", timestamp: Date.now() - 1000 * 60 * 5 },
  { user: "Ali Raza", email: "ali.raza@mail.com", operation: "decode", file_type: "audio", status: "success", timestamp: Date.now() - 1000 * 60 * 22 },
  { user: "Emily Stone", email: "emily.stone@mail.com", operation: "encode", file_type: "video", status: "pending", timestamp: Date.now() - 1000 * 60 * 48 },
  { user: "Omar Farooq", email: "omar.f@mail.com", operation: "decode", file_type: "image", status: "failed", timestamp: Date.now() - 1000 * 60 * 75 },
  { user: "Maria Lopez", email: "maria.lopez@mail.com", operation: "encode", file_type: "audio", status: "success", timestamp: Date.now() - 1000 * 60 * 130 },
];

// ── Stat Card config ──────────────────────────────────────────────────────────
const STAT_CARD_CONFIG = [
  { key: "total_users", deltaKey: "delta_users", label: "Total Users", icon: ICONS.users, color: "#2563eb", bg: "#eff6ff" },
  { key: "total_encodes", deltaKey: "delta_encodes", label: "Total Encoded", icon: ICONS.shield, color: "#7c3aed", bg: "#f5f3ff" },
  { key: "total_decodes", deltaKey: "delta_decodes", label: "Total Decoded", icon: ICONS.history, color: "#0891b2", bg: "#ecfeff" },
  { key: "active_sessions", deltaKey: "delta_sessions", label: "Active Sessions", icon: ICONS.server, color: "#16a34a", bg: "#f0fdf4" },
];


// ── Line Chart (pure SVG) ─────────────────────────────────────────────────────
function LineChart({ data }) {
  const width = 560;
  const height = 220;
  const padding = { top: 16, right: 12, bottom: 8, left: 12 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const allVals = data.flatMap((d) => [d.encode, d.decode]);
  const max = Math.max(...allVals) * 1.15;

  const points = (key) =>
    data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * innerW;
      const y = padding.top + innerH - (d[key] / max) * innerH;
      return { x, y };
    });

  const toPath = (pts) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  const encodePts = points("encode");
  const decodePts = points("decode");

  const encodeArea = `${toPath(encodePts)} L ${encodePts[encodePts.length - 1].x} ${padding.top + innerH} L ${encodePts[0].x} ${padding.top + innerH} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => padding.top + innerH * t);

  return (
    <div className={styles.chartWrap}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
        <defs>
          <linearGradient id="encodeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        {gridLines.map((y, i) => (
          <line key={i} x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="#eef1f6" strokeWidth="1" />
        ))}
        <path d={encodeArea} fill="url(#encodeFill)" />
        <path d={toPath(decodePts)} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={toPath(encodePts)} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {encodePts.map((p, i) => (
          <circle key={`e${i}`} cx={p.x} cy={p.y} r="3.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
        ))}
        {decodePts.map((p, i) => (
          <circle key={`d${i}`} cx={p.x} cy={p.y} r="3.5" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
        ))}
      </svg>
      <div className={styles.chartAxisLabels}>
        {data.map((d) => (
          <span key={d.day} className={styles.chartAxisLabel}>{d.day}</span>
        ))}
      </div>
    </div>
  );
}

// ── Donut Chart (pure SVG) ────────────────────────────────────────────────────
function DonutChart({ stats }) {
  const total = stats.images_processed + stats.audio_processed + stats.video_processed;
  const segments = [
    { label: "Images", value: stats.images_processed, color: "#2563eb" },
    { label: "Audio", value: stats.audio_processed, color: "#7c3aed" },
    { label: "Videos", value: stats.video_processed, color: "#38bdf8" },
  ];
  const r = 62;
  const cx = 80;
  const cy = 80;
  const sw = 22;
  const circ = 2 * Math.PI * r;
  let cumulative = 0;

  return (
    <div className={styles.donutWrap}>
      <svg width={160} height={160}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eef1f6" strokeWidth={sw} />
        {segments.map((s) => {
          const pct = total ? s.value / total : 0;
          const dash = pct * circ;
          const rest = circ - dash;
          const offset = -(cumulative * circ - circ / 4);
          cumulative += pct;
          return (
            <circle
              key={s.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={sw}
              strokeDasharray={`${dash} ${rest}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">
          {total}%
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#94a3b8" fontSize="11">
          Total Files
        </text>
      </svg>
      <div className={styles.donutLegend}>
        {segments.map((s) => (
          <div key={s.label} className={styles.donutLegendItem}>
            <span className={styles.donutDot} style={{ background: s.color }} />
            <span className={styles.donutLegendLabel}>{s.label}</span>
            <span className={styles.donutLegendValue}>{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function timeAgo(ts) {
  const diffMin = Math.round((Date.now() - new Date(ts).getTime()) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function initialsAvatar(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563EB&color=fff&size=64`;
}

const TYPE_COLORS = { image: "#2563eb", audio: "#7c3aed", video: "#38bdf8" };
const STATUS_CLASS = { success: "statusSuccess", failed: "statusFailed", pending: "statusPending" };

// ── AdminDashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const adminName = (typeof window !== "undefined" && localStorage.getItem("username")) || "Admin User";
  const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  useEffect(() => {
    let cancelled = false;
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/admin/dashboard/admin-stats`);
        const data = await response.json();
        if (!cancelled && data.success) {
          setStats(data);
          setActivities(data.activities || []);
          return;
        }
        throw new Error("API returned unsuccessful response");
      } catch (error) {
        // Fallback to mock data so the dashboard always renders something useful
        if (!cancelled) {
          setStats(FALLBACK_STATS);
          setActivities(FALLBACK_ACTIVITIES);
        }
      }
    };
    fetchAdminData();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:5000/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          username: localStorage.getItem("username"),
          email: localStorage.getItem("email"),
          role: localStorage.getItem("role"),
        }),
      });
    } catch (error) {
      console.error("Logout logging failed:", error);
    }
    localStorage.clear();
    navigate("/login");
  };

  const filteredActivities = useMemo(() => {
    if (!search.trim()) return activities;
    const q = search.toLowerCase();
    return activities.filter(
      (a) =>
        a.user?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.file_type?.toLowerCase().includes(q)
    );
  }, [search, activities]);

  if (!stats) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarCollapsed : ""}`}>
        <div className={styles.logo}>
          <div className={styles.logoMark}>
            <Icon d={ICONS.shield} size={18} color="#ffffff" />
          </div>
          {sidebarOpen && (
            <div className={styles.logoText}>
              <span className={styles.logoHide}>Hide</span>
              <span className={styles.logoCrypt}>Crypt</span>
              <span className={styles.logoSub}>Admin Panel</span>
            </div>
          )}
        </div>

        <nav className={styles.nav}>
          {sidebarOpen && <span className={styles.navSectionLabel}>Menu</span>}
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === "admin";
            return (
              <Link key={item.key} to={item.to} className={styles.navLink}>
                <div className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}>
                  <Icon d={item.icon} size={18} color={isActive ? "#ffffff" : "#2563eb"} />
                  {sidebarOpen && (
                    <span className={`${styles.navLabel} ${isActive ? styles.navLabelActive : ""}`}>
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <Icon d={ICONS.logout} size={18} color="#ef4444" />
          {sidebarOpen && <span className={styles.logoutLabel}>Logout</span>}
        </button>
      </aside>

      {/* ── Main ── */}
      <main className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.menuBtn} onClick={() => setSidebarOpen((o) => !o)}>
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
            </button>
            <div className={styles.topbarTitleWrap}>
              <h1 className={styles.topbarTitle}>Admin Dashboard</h1>
              <span className={styles.topbarSubtitle}>Platform overview &amp; activity monitoring</span>
            </div>
          </div>
          <div className={styles.topbarRight}>
            <div className={styles.searchBox}>
              <Icon d={ICONS.search} size={15} color="#aab4c4" />
              <input
                className={styles.searchInput}
                placeholder="Search users, files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className={styles.bellWrap}>
              <Icon d={ICONS.bell} size={18} color="#475569" />
              <span className={styles.bellDot} />
            </div>
            <div className={styles.avatarWrap}>
              <img src={initialsAvatar(adminName)} alt="Admin avatar" className={styles.avatarImg} />
              <div>
                <div className={styles.avatarName}>{adminName}</div>
                <div className={styles.avatarRole}>Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className={styles.content}>
          {/* ── Stat Cards ── */}
          <div className={styles.statGrid}>
            {stats &&
              STAT_CARD_CONFIG.map((cfg) => {
                const delta = stats[cfg.deltaKey] ?? 0;
                const isUp = delta >= 0;
                return (
                  <div key={cfg.key} className={styles.statCard}>
                    <div className={styles.statCardTop}>
                      <div className={styles.statIconWrap} style={{ background: cfg.bg }}>
                        <Icon d={cfg.icon} size={20} color={cfg.color} />
                      </div>
                    </div>
                    <div className={styles.statLabel}>{cfg.label}</div>
                    <div className={styles.statValue}>{stats[cfg.key]?.toLocaleString()}</div>
                    <div className={styles.statDeltaRow}>
                      <span className={`${styles.statDelta} ${isUp ? styles.statDeltaUp : styles.statDeltaDown}`}>
                        <Icon d={isUp ? ICONS.arrowUp : ICONS.arrowDown} size={11} />
                        {Math.abs(delta)}%
                      </span>
                      <span className={styles.statDeltaCaption}>vs last week</span>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* ── Charts ── */}
          <div className={styles.grid2}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>Daily Activity</div>
                  <div className={styles.cardSubtitle}>Encode vs. decode operations, last 7 days</div>
                </div>
                <div className={styles.legendRow}>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#2563eb" }} />
                    Encode
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#38bdf8" }} />
                    Decode
                  </span>
                </div>
              </div>
              {stats && <LineChart data={stats.daily_activity} />}
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>File Types</div>
                  <div className={styles.cardSubtitle}>Distribution by media</div>
                </div>
              </div>
              {stats && <DonutChart stats={stats} />}
            </div>
          </div>

          {/* ── Table + Side cards ── */}
          <div className={styles.gridBottom}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Recent Activity</div>
                <Link to="/history" className={styles.viewAllLink}>View All</Link>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Operation</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.map((a, i) => (
                      <tr key={i} className={styles.tableRow}>
                        <td className={styles.tableCell}>
                          <div className={styles.userCellWrap}>
                            <img src={initialsAvatar(a.user)} alt={a.user} className={styles.userAvatar} />
                            <div>
                              <div className={styles.userName}>{a.user}</div>
                              <div className={styles.userEmail}>{a.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className={styles.tableCell}>
                          <span className={styles.typeBadge}>
                            <span className={styles.typeDot} style={{ background: TYPE_COLORS[a.file_type] }} />
                            {a.operation.charAt(0).toUpperCase() + a.operation.slice(1)} · {a.file_type}
                          </span>
                        </td>
                        <td className={styles.tableCell}>
                          <span className={`${styles.statusBadge} ${styles[STATUS_CLASS[a.status]]}`}>
                            {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                          </span>
                        </td>
                        <td className={`${styles.tableCell} ${styles.tableTimeCell}`}>{timeAgo(a.timestamp)}</td>
                      </tr>
                    ))}
                    {filteredActivities.length === 0 && (
                      <tr>
                        <td className={styles.tableCell} colSpan={4} style={{ textAlign: "center", color: "#94a3b8" }}>
                          No matching activity found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sideStack}>
              <div className={styles.card}>
                <div className={styles.cardTitle} style={{ marginBottom: 18 }}>System Status</div>
                <div className={styles.metricList}>
                  {SECURITY_ITEMS.map((sec, i) => (
                    <div key={i} className={styles.metricItem}>
                      <div className={styles.metricLeft}>
                        <div className={styles.metricIconWrap}>
                          <Icon d={sec.icon} size={15} color="#2563eb" />
                        </div>
                        <span className={styles.metricLabel}>{sec.label}</span>
                      </div>
                      <span className={styles.metricValue}>{sec.value}</span>
                    </div>
                  ))}
                  <div className={styles.metricFullRow}>
                    <div className={styles.metricFullTop}>
                      <span className={styles.metricLabel}>Storage Used</span>
                      <span className={styles.metricValue}>62%</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: "62%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle} style={{ marginBottom: 14 }}>Quick Actions</div>
                <div className={styles.quickActions}>
                  {QUICK_ACTIONS.map((qa, i) => (
                    <div key={i} className={styles.quickActionBtn} role="button" tabIndex={0}>
                      <div className={styles.quickActionIcon}>
                        <Icon d={qa.icon} size={16} color="#2563eb" />
                      </div>
                      <div>
                        <div className={styles.quickActionLabel}>{qa.label}</div>
                        <div className={styles.quickActionSub}>{qa.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}