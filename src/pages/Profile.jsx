import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile = () => {
    // Sample user data with state
    const [userData, setUserData] = useState({
        name: "",
        userId: "",
        email: "",
        area: "",
        profilePhoto: ""
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState(userData);
    const [isPhotoUploadOpen, setIsPhotoUploadOpen] = useState(false);

    // Statistics data
    const statistics = {
        encoded: {
            images: 18,
            audio: 19,
            videos: 4,
        },
        decoded: {
            images: 9,
            audio: 8,
            videos: 6,
        },
    };

    const totalEncoded =
        statistics.encoded.images +
        statistics.encoded.audio +
        statistics.encoded.videos;

    const totalDecoded =
        statistics.decoded.images +
        statistics.decoded.audio +
        statistics.decoded.videos;

    const totalImages =
        statistics.encoded.images +
        statistics.decoded.images;

    const totalAudio =
        statistics.encoded.audio +
        statistics.decoded.audio;

    const totalVideos =
        statistics.encoded.videos +
        statistics.decoded.videos;


    // Modal handlers
    const handleEditClick = () => {
        setEditFormData(userData);
        setIsEditModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = async () => {

        try {

            const user_id = localStorage.getItem("user_id");

            await axios.put(
                "http://localhost:5000/profile/profile/update",
                {
                    user_id,
                    name: editFormData.name,
                    email: userData.email,
                    area: editFormData.area,
                    profile_photo: userData.profilePhoto
                }
            );

            setUserData(prev => ({
                ...prev,
                name: editFormData.name,
                area: editFormData.area
            }));

            setIsEditModalOpen(false);

            alert("Profile updated successfully");

        } catch (error) {

            console.log(error);
            alert("Failed to update profile");
        }
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handlePhotoChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {

            const photo = reader.result;

            setUserData(prev => ({
                ...prev,
                profilePhoto: photo
            }));

            try {

                const user_id = localStorage.getItem("user_id");

                await axios.put(
                    "http://localhost:5000/profile/profile/update",
                    {
                        user_id,
                        name: userData.name,
                        email: userData.email,
                        area: userData.area,
                        profile_photo: photo
                    }
                );

                alert("Profile photo updated");

            } catch (error) {

                console.log(error);
                alert("Failed to save photo");
            }

            setIsPhotoUploadOpen(false);
        };

        reader.readAsDataURL(file);
    };

    const fetchProfile = async () => {

        try {

            const user_id = localStorage.getItem("user_id");

            const response = await axios.get(
                `http://localhost:5000/profile/profile/${user_id}`
            );

            setUserData({
                name: response.data.name,
                userId: response.data.userId,
                email: response.data.email,
                area: response.data.area,
                profilePhoto:
                    response.data.profile_photo ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
            });

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <span className={styles.logoDark}>Hide</span>
                    <span className={styles.logoBlue}>Crypt</span>
                </div>

                <nav className={styles.nav}>
                    <Link to="/dashboard" className={styles.navLink}>
                        <i className="ti ti-home" aria-hidden="true"></i>
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/home" className={styles.navLink}>
                        <i className="ti ti-home" aria-hidden="true"></i>
                        <span>Home page</span>
                    </Link>

                    <Link to="/image-steganography" className={styles.navLink}>
                        <i className="ti ti-photo" aria-hidden="true"></i>
                        <span>Image Stenography</span>
                    </Link>

                    <Link to="/audio-steganography" className={styles.navLink}>
                        <i className="ti ti-music" aria-hidden="true"></i>
                        <span>Audio Stenography</span>
                    </Link>

                    <Link to="/video-steganography" className={styles.navLink}>
                        <i className="ti ti-video" aria-hidden="true"></i>
                        <span>Video Stenography</span>
                    </Link>

                    <Link to="/history" className={styles.navLink}>
                        <i className="ti ti-history" aria-hidden="true"></i>
                        <span>History</span>
                    </Link>

                    <Link to="/profile" className={`${styles.navLink} ${styles.active}`}>
                        <i className="ti ti-user" aria-hidden="true"></i>
                        <span>Profile</span>
                    </Link>
                </nav>
            </aside>

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1>Profile</h1>
                </div>

                {/* Profile Card */}
                <div className={styles.profileCard}>
                    <div className={styles.profileHeader}>
                        <div className={styles.photoSection}>
                            <img
                                src={userData.profilePhoto}
                                alt={userData.name}
                                className={styles.profilePhoto}
                            />
                            <button
                                className={styles.changePhotoBtn}
                                onClick={() => setIsPhotoUploadOpen(true)}
                            >
                                <i className="ti ti-camera" aria-hidden="true"></i>
                                Change Photo
                            </button>
                        </div>

                        <div className={styles.profileInfo}>
                            <h2 className={styles.userName}>{userData.name}</h2>
                            <p className={styles.userId}>ID: {userData.userId}</p>
                            <p className={styles.email}>
                                <i className="ti ti-mail" aria-hidden="true"></i>
                                {userData.email}
                            </p>
                            <p className={styles.area}>
                                <i className="ti ti-map-pin" aria-hidden="true"></i>
                                {userData.area}
                            </p>

                        </div>

                        <button className={styles.editBtn} onClick={handleEditClick}>
                            <i className="ti ti-edit" aria-hidden="true"></i>
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Statistics Overview Section */}
                <div className={styles.statsSection}>
                    <h3 className={styles.sectionTitle}>Statistics Overview</h3>
                    <div className={styles.metricsGrid}>
                        <div className={styles.metricCard}>
                            <p className={styles.metricLabel}>Total Encodes</p>
                            <p className={styles.metricValue}>{totalEncoded}</p>
                        </div>

                        <div className={styles.metricCard}>
                            <p className={styles.metricLabel}>Total Decodes</p>
                            <p className={styles.metricValue}>{totalDecoded}</p>
                        </div>

                        <div className={styles.metricCard}>
                            <p className={styles.metricLabel}>Images Processed</p>
                            <p className={styles.metricValue}>{totalImages}</p>
                        </div>

                        <div className={styles.metricCard}>
                            <p className={styles.metricLabel}>Audio Processed</p>
                            <p className={styles.metricValue}>{totalAudio}</p>
                        </div>

                        <div className={styles.metricCard}>
                            <p className={styles.metricLabel}>Video Processed</p>
                            <p className={styles.metricValue}>{totalVideos}</p>
                        </div>
                    </div>
                </div>

                {/* Usage Overview - Donut Chart */}

            </main>

            {/* Photo Upload Modal */}
            {isPhotoUploadOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsPhotoUploadOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Change Profile Photo</h2>
                            <button
                                className={styles.modalCloseBtn}
                                onClick={() => setIsPhotoUploadOpen(false)}
                            >
                                <i className="ti ti-x" aria-hidden="true"></i>
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.uploadArea}>
                                <i className="ti ti-camera" aria-hidden="true"></i>
                                <p className={styles.uploadText}>Click to upload or drag and drop</p>
                                <p className={styles.uploadSubtext}>SVG, PNG, JPG or GIF (max. 5MB)</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className={styles.fileInput}
                                />
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button
                                className={styles.modalCancelBtn}
                                onClick={() => setIsPhotoUploadOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Edit Profile</h2>
                            <button
                                className={styles.modalCloseBtn}
                                onClick={handleCloseModal}
                            >
                                <i className="ti ti-x" aria-hidden="true"></i>
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.formLabel}>Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.formLabel}>
                                    Email Address (Cannot be changed)
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    value={editFormData.email}
                                    disabled
                                    className={styles.formInput}
                                    style={{
                                        backgroundColor: "var(--color-background-secondary)",
                                        cursor: "not-allowed"
                                    }}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="area" className={styles.formLabel}>Location (Area)</label>
                                <input
                                    type="text"
                                    id="area"
                                    name="area"
                                    value={editFormData.area}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    placeholder="Enter your location"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="userId" className={styles.formLabel}>User ID (Cannot be changed)</label>
                                <input
                                    type="text"
                                    id="userId"
                                    name="userId"
                                    value={editFormData.userId}
                                    disabled
                                    className={styles.formInput}
                                    style={{ backgroundColor: 'var(--color-background-secondary)', cursor: 'not-allowed' }}
                                />
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button
                                className={styles.modalCancelBtn}
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.modalSaveBtn}
                                onClick={handleSaveProfile}
                            >
                                <i className="ti ti-check" aria-hidden="true"></i>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;