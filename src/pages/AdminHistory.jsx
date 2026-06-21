import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './History.module.css';


const AdminHistory = () => {



    const [historyData, setHistoryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 10;


    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:5000/admin/all-history"
            );

            const data = await response.json();

            console.log(data);

            if (data.success) {
                setHistoryData(data.history);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = historyData.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const totalPages = Math.ceil(
        historyData.length / recordsPerPage
    );

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <span className={styles.logoDark}>Hide</span>
                    <span className={styles.logoBlue}>Crypt</span>
                </div>

                <nav className={styles.nav}>
                    <Link to="/admin" className={styles.navLink}>
                        <i className="ti ti-home" aria-hidden="true"></i>
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/" className={styles.navLink}>
                        <i className="ti ti-home" aria-hidden="true"></i>
                        <span>Home page</span>
                    </Link>

                    <Link to="/imageStego" className={styles.navLink}>
                        <i className="ti ti-photo" aria-hidden="true"></i>
                        <span>Image Stenography</span>
                    </Link>

                    <Link to="/audioStego" className={styles.navLink}>
                        <i className="ti ti-music" aria-hidden="true"></i>
                        <span>Audio Stenography</span>
                    </Link>

                    <Link to="/videoStego" className={styles.navLink}>
                        <i className="ti ti-video" aria-hidden="true"></i>
                        <span>Video Stenography</span>
                    </Link>

                    <Link to="/admin-history" className={`${styles.navLink} ${styles.active}`}>
                        <i className="ti ti-history" aria-hidden="true"></i>
                        <span>History</span>
                    </Link>


                </nav>
            </aside>

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1>Admin History</h1>
                    <div className={styles.tabs}>
                        <button className={`${styles.tab} ${styles.tabActive}`}>History</button>

                        <button className={styles.reportBtn}>
                            <i className="ti ti-download" aria-hidden="true"></i>
                            Export Report
                        </button>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Username</th>
                                <th>File Name</th>
                                <th>File Type</th>
                                <th>Action</th>
                                <th>Status</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {new Date(item.timestamp).toLocaleString()}
                                    </td>

                                    <td>
                                        {item.username || "Unknown"}
                                    </td>

                                    <td className={styles.fileName}>
                                        {item.file_name || "N/A"}
                                    </td>

                                    <td>{item.file_type}</td>

                                    <td>
                                        {item.operation?.toUpperCase()}
                                    </td>

                                    <td>
                                        <span className={`${styles.status} ${styles.statusSuccess}`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    <td>{item.file_size || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={styles.pageBtn}
                        >
                            Previous
                        </button>

                        <span className={styles.pageInfo}>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={styles.pageBtn}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AdminHistory;