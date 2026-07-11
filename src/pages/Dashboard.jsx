import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

// ── Inline SVG Icon helper ────────────────────────────────────────────────────
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

// ── Icon path constants ───────────────────────────────────────────────────────
const ICONS = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  home: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  imagestego: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
  audiostego: "m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z",
  videostego: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z",
  history: "M12 8v4l3 3M3.05 11a9 9 0 1017.9 0",
  profile: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  image: "M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4l2 3h8a2 2 0 012 2z",
  audio: "M9 18V5l12-2v13M6 21a3 3 0 100-6 3 3 0 000 6zM18 19a3 3 0 100-6 3 3 0 000 6z",
  video: "M15 10l4.553-2.07A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.94L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
  check: "M20 6L9 17l-5-5",
};

// ── Static data ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: ICONS.dashboard, to: "/dashboard" },
  { key: "home", label: "Home page", icon: ICONS.home, to: "/" },
  { key: "imagestego", label: "Image Stegnography", icon: ICONS.imagestego, to: "/imageStego" },
  { key: "audiostego", label: "Audio Stegnography", icon: ICONS.audiostego, to: "/audioStego" },
  { key: "videostego", label: "Video Stegnography", icon: ICONS.videostego, to: "/videoStego" },
  { key: "history", label: "History", icon: ICONS.history, to: "/history" },
  { key: "profile", label: "Profile", icon: ICONS.profile, to: "/profile" },
];



const TOOL_CARDS = [
  {
    key: "image",
    title: "Image",
    accent: "Steganography",
    sub: "Hide messages in images",
    icon: ICONS.image,
    color: "#1106e1",
    bg: "rgba(72, 8, 234, 0.15)",
    border: "rgba(0, 255, 166, 0.25)",
    to: "/imageStego",
  },
  {
    key: "audio",
    title: "Audio",
    accent: "Steganography",
    sub: "Hide messages in audio",
    icon: ICONS.audio,
    color: "#3f09e2",
    bg: "rgba(62, 0, 247, 0.15)",
    border: "rgba(255, 255, 255, 0.25)",
    to: "/audioStego",
  },
  {
    key: "video",
    title: "Video",
    accent: "Steganography",
    sub: "Hide messages in videos",
    icon: ICONS.video,
    color: "#077a8e",
    bg: "rgba(1, 104, 122, 0.15)",
    border: "rgba(6,182,212,0.25)",
    to: "/videoStego",
  },
  {
    key: "recent",
    title: "Recent",
    accent: "Activities",
    sub: "View your history",
    icon: ICONS.activity,
    color: "#00a367",
    bg: "rgba(52,211,153,0.15)",
    border: "rgba(52,211,153,0.25)",
    to: "/history",
  },
];

const SECURITY_ITEMS = [
  { label: "Encryption", value: "AES-256", icon: ICONS.shield },
  { label: "Password Protection", value: "Enabled", icon: ICONS.lock },
  { label: "Role", value: "User", icon: ICONS.check },
  { label: "Stego Technique", value: "LSB", icon: ICONS.profile },
];

// ── Donut Chart (pure SVG) ────────────────────────────────────────────────────
function DonutChart({ stats }) {
  const total =
    stats.images_processed +
    stats.audio_processed +
    stats.video_processed;

  const segments = [
    {
      label: "Images",
      value: stats.images_processed,
      color: "#6C63FF",
      pct: total ? stats.images_processed / total : 0,
    },
    {
      label: "Audio",
      value: stats.audio_processed,
      color: "#A78BFA",
      pct: total ? stats.audio_processed / total : 0,
    },
    {
      label: "Videos",
      value: stats.video_processed,
      color: "#06B6D4",
      pct: total ? stats.video_processed / total : 0,
    },
  ];

  const r = 58;
  const cx = 68;
  const cy = 68;
  const sw = 20;
  const circ = 2 * Math.PI * r;
  let gap = 0; // cumulative offset in [0,1]

  return (
    <div className={styles.donutWrap}>
      <svg width={136} height={136}>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth={sw} />
        {/* Segments */}
        {segments.map((s) => {
          const dash = s.pct * circ;
          const rest = circ - dash;
          const offset = -(gap * circ - circ / 4); // start from top
          gap += s.pct;
          return (
            <circle
              key={s.label}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={sw}
              strokeDasharray={`${dash} ${rest}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          );
        })}
        {/* Centre labels */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fill="#0F172A"
          fontSize="15"
          fontWeight="700"
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fill="#35465e"
          fontSize="10"
        >
          Files
        </text>
      </svg>

      <div className={styles.donutLegend}>
        {segments.map((s) => (
          <div key={s.label} className={styles.donutLegendItem}>
            <span className={styles.donutDot} style={{ background: s.color }} />
            <span className={styles.donutLegendLabel}>{s.label}</span>
            <span className={styles.donutLegendValue}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        const response = await fetch(
          `http://127.0.0.1:5000/dashboard/stats/${userId}`
        );

        const data = await response.json();

        if (data.success) {
          setStats(data);
          setActivities(data.activities);
        }

      } catch (error) {
        console.error("Dashboard fetch failed:", error);
      }

    };

    fetchDashboardData();

  }, [userId]);

  const handleLogout = async () => {

    try {

      await fetch("http://127.0.0.1:5000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          username: localStorage.getItem("username"),
          email: localStorage.getItem("email"),
          role: localStorage.getItem("role")
        })
      });

    } catch (error) {
      console.error("Logout logging failed:", error);
    }

    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.root}>

      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarCollapsed : ""}`}>

        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoHide}>Hide</span>
          <span className={styles.logoCrypt}>Crypt</span>
        </div>

        {/* Nav links */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.key;
            return (
              <Link
                key={item.key}
                to={item.to}
                className={styles.navLink}
                onClick={() => setActiveNav(item.key)}
              >
                <div className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}>
                  <Icon
                    d={item.icon}
                    size={18}
                    color={isActive ? "#000000" : "#0071e2"}
                  />
                  {sidebarOpen && (
                    <span className={`${styles.navLabel} ${isActive ? styles.navLabelActive : ""}`}>
                      {item.label}
                    </span>
                  )}
                  {isActive && <span className={styles.activePill} />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
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
            {/* Hamburger */}
            <button className={styles.menuBtn} onClick={() => setSidebarOpen((o) => !o)}>
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
            </button>
            <h1 className={styles.topbarTitle}>Dashboard</h1>
          </div>

          <div className={styles.topbarRight}>
            {/* Bell */}
            

            {/* Avatar */}
            <div className={styles.avatarWrap}>   
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=6C63FF&color=fff&size=36"
                alt="User avatar"
                className={styles.avatarImg}
              />
              <div>
                <div className={styles.avatarName}>{username}</div>
                <div className={styles.avatarRole}>{role}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className={styles.content}>

          {/* ── Tool Cards ── */}
          <div className={styles.grid4}>
            {TOOL_CARDS.map((card) => (
              <Link key={card.key} to={card.to} className={styles.toolCardLink}>
                <div className={styles.toolCard}>
                  <div
                    className={styles.toolIconWrap}
                    style={{
                      background: card.bg,
                      border: `1px solid ${card.border}`,
                    }}
                  >
                    <Icon d={card.icon} size={22} color={card.color} />
                  </div>
                  <div className={styles.toolCardTitle}>{card.title}</div>
                  <div
                    className={styles.toolCardAccent}
                    style={{ color: card.color }}
                  >
                    {card.accent}
                  </div>
                  <div className={styles.toolCardSub}>{card.sub}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* ── Stats + Donut ── */}
          <div className={styles.grid2}>
            {/* Statistics */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Statistics Overview</h3>
              <div className={styles.statsRow}>
                {stats && (
                  <>
                    <div className={styles.statBox}>
                      <div className={styles.statLabel}>Total Encodes</div>
                      <div className={styles.statValue}>
                        {stats.total_encodes}
                      </div>
                    </div>

                    <div className={styles.statBox}>
                      <div className={styles.statLabel}>Total Decodes</div>
                      <div className={styles.statValue}>
                        {stats.total_decodes}
                      </div>
                    </div>

                    <div className={styles.statBox}>
                      <div className={styles.statLabel}>Images Processed</div>
                      <div className={styles.statValue}>
                        {stats.images_processed}
                      </div>
                    </div>

                    <div className={styles.statBox}>
                      <div className={styles.statLabel}>Audio Processed</div>
                      <div className={styles.statValue}>
                        {stats.audio_processed}
                      </div>
                    </div>

                    <div className={styles.statBox}>
                      <div className={styles.statLabel}>Video Processed</div>
                      <div className={styles.statValue}>
                        {stats.video_processed}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Usage donut */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Usage Overview</h3>
                {stats && <DonutChart stats={stats} />}
              </div>
            </div>

            {/* ── Recent Activities + Security ── */}
            <div className={styles.rightSection}>
              {/* Recent */}
              <div className={styles.card}>
                <div className={styles.recentHeader}>
                  <h3 className={styles.cardTitle} style={{ margin: 0 }}>Recent Activities</h3>
                  <Link to="/history" className={styles.viewAllLink}>View All</Link>
                </div>
                <table className={styles.activityTable}>
                  <tbody>
                    {activities.map((activity, index) => (
                      <tr key={index} className={styles.activityRow}>
                        <td className={styles.activityCell}>
                          <div className={styles.activityFileWrap}>

                            <div className={styles.activityIcon}>
                              <Icon
                                d={
                                  activity.file_type === "image"
                                    ? ICONS.image
                                    : activity.file_type === "audio"
                                      ? ICONS.audio
                                      : ICONS.video
                                }
                                size={15}
                                color="#6C63FF"
                              />
                            </div>

                            <div>
                              <div className={styles.activityFileName}>
                                {activity.operation.toUpperCase()}
                              </div>

                              <div className={styles.activityFileType}>
                                {activity.file_type}
                              </div>
                            </div>

                          </div>
                        </td>

                        <td className={styles.activityTime}>
                          {new Date(activity.timestamp).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit"
                          })}
                        </td>

                        <td className={styles.activityStatus}>
                          <span className={styles.statusBadge}>
                            Success
                          </span>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Security */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Security Status</h3>
                <div className={styles.securityList}>
                  {SECURITY_ITEMS.map((sec, i) => (
                    <div key={i} className={styles.securityItem}>
                      <div className={styles.securityLeft}>
                        <div className={styles.securityIconWrap}>
                          <Icon d={sec.icon} size={15} color="#6C63FF" />
                        </div>
                        <span className={styles.securityLabel}>{sec.label}</span>
                      </div>
                      <span className={styles.securityValue}>{sec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>{/* /content */}
      </main>
    </div>
  );
}