import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminUser.module.css";

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
    plus: "M12 5v14M5 12h14",
    more: "M12 12h.01M12 6h.01M12 18h.01",
    chevronRight: "M9 18l6-6-6-6",
};

// ── Static nav (same items/order as AdminDashboard sidebar) ─────────────────
const NAV_ITEMS = [
    { key: "admin", label: "Dashboard", icon: ICONS.dashboard, to: "/admin" },
    { key: "users", label: "Users", icon: ICONS.users, to: "/admin/users" },
    { key: "home", label: "Home page", icon: ICONS.dashboard, to: "/" },
    { key: "imagestego", label: "Image steg.", icon: ICONS.image, to: "/imageStego" },
    { key: "audiostego", label: "Audio steg.", icon: ICONS.audio, to: "/audioStego" },
    { key: "videostego", label: "Video steg.", icon: ICONS.video, to: "/videoStego" },
    { key: "history", label: "History", icon: ICONS.history, to: "/admin-history" },
    { key: "profile", label: "Profile", icon: ICONS.users, to: "/admin/profile" },
];

// ── Mock users data (matches the reference screenshot) ──────────────────────


function initials(name = "") {
    return name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

// ── AdminUsers ────────────────────────────────────────────────────────────────
export default function AdminUsers() {
    const [search, setSearch] = useState("");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const filteredUsers = useMemo(() => {
        if (!search.trim()) return users;

        const q = search.toLowerCase();

        return users.filter(
            (u) =>
                (u.name || u.username || "")
                    .toLowerCase()
                    .includes(q) ||
                (u.email || "")
                    .toLowerCase()
                    .includes(q)
        );
    }, [search, users]);

    const totalUsers = users.length;
    const totalEncoded = users.reduce((sum, u) => sum + (u.total_encode || 0), 0);
    const totalDecoded = users.reduce((sum, u) => sum + (u.total_decode || 0), 0);
    const activeToday = 3;

    const STAT_CARDS = [
        { label: "Total users", value: totalUsers.toLocaleString() },
        { label: "Encoded", value: totalEncoded.toLocaleString() },
        { label: "Decoded", value: totalDecoded.toLocaleString() },
        { label: "Active today", value: activeToday.toLocaleString() },
    ];

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/users");
            const data = await response.json();

            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p className={styles.loadingText}>
                    Loading Users...
                </p>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            {/* ── Sidebar ── */}
            <aside className={styles.sidebar}>
                <nav className={styles.nav}>
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.key === "users";
                        return (
                            <Link key={item.key} to={item.to} className={styles.navLink}>
                                <div className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}>
                                    <Icon d={item.icon} size={18} color={isActive ? "#ffffff" : "#2563eb"} />
                                    <span className={`${styles.navLabel} ${isActive ? styles.navLabelActive : ""}`}>
                                        {item.label}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* ── Main ── */}
            <main className={styles.main}>
                <div className={styles.content}>
                    {/* ── Page header ── */}
                    <div className={styles.pageHeader}>
                        <div>
                            <h1 className={styles.pageTitle}>Users management</h1>
                            <span className={styles.pageSubtitle}>{totalUsers} accounts</span>
                        </div>
                        <div className={styles.pageHeaderRight}>
                            <div className={styles.searchBox}>
                                <Icon d={ICONS.search} size={15} color="#aab4c4" />
                                <input
                                    className={styles.searchInput}
                                    placeholder="Search users"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <button className={styles.addBtn}>
                                <Icon d={ICONS.plus} size={15} color="#0f172a" />
                                Add
                            </button>
                            <button className={styles.moreBtn}>
                                <Icon d={ICONS.more} size={18} color="#475569" />
                            </button>
                        </div>
                    </div>

                    {/* ── Stat cards ── */}
                    <div className={styles.statGrid}>
                        {STAT_CARDS.map((cfg) => (
                            <div key={cfg.label} className={styles.statCard}>
                                <div className={styles.statLabel}>{cfg.label}</div>
                                <div className={styles.statValue}>{cfg.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* ── Users table ── */}

                    <div className={styles.tableCard}>

                        <div className={`${styles.tableRow} ${styles.tableHeadRow}`}>
                            <div className={styles.colUser}>User</div>
                            <div className={styles.colId}>ID</div>
                            <div className={styles.colNum}>Enc.</div>
                            <div className={styles.colNum}>Dec.</div>
                            <div className={styles.colRatio}>Ratio</div>
                            <div className={styles.colChevron} />
                        </div>

                        {filteredUsers.map((u) => (
                            <div key={u.user_id} className={styles.tableRow}>
                                <div className={styles.colUser}>
                                    <div className={styles.userAvatar}>{initials(u.name || u.username)}</div>
                                    <div>
                                        <div className={styles.userName}> {u.name || u.username}</div>
                                        <div className={styles.userEmail}>{u.email}</div>
                                    </div>
                                </div>
                                <div className={styles.colId}>
                                    <span className={styles.idBadge}>{u.user_id}</span>
                                </div>
                                <div className={styles.colNum}>{u.total_encode || 0}</div>
                                <div className={styles.colNum}>{u.total_decode || 0}</div>
                                <div className={styles.colRatio}>
                                    <div className={styles.progressTrack}>
                                        <div className={styles.progressFill} style={{
                                            width: `${u.total_encode > 0
                                                ? Math.min(
                                                    100,
                                                    Math.round((u.total_decode / u.total_encode) * 100)
                                                )
                                                : 0
                                                }%`,
                                        }} />
                                    </div>
                                </div>
                                <div className={styles.colChevron}>
                                    <Icon d={ICONS.chevronRight} size={16} color="#aab4c4" />
                                </div>
                            </div>
                        ))}

                        {filteredUsers.length === 0 && (
                            <div className={styles.emptyState}>No users match your search.</div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}