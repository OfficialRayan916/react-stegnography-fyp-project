import React, { useState, useRef, useEffect } from 'react'
import Styles from "./VideoStego.module.css"
import Navbar from '../components/Navbar'
import Toggle from '../components/Toggle'
import Footer from '../components/Footer'

import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CloseIcon from "@mui/icons-material/Close";

function VideoStego() {

    const [mode, setMode] = useState("encode");
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [encodedVideo, setEncodedVideo] = useState(null);

    const fileInputRef = useRef(null);

    // RESET VIDEO WHEN MODE CHANGES
    useEffect(() => {
        setSelectedVideo(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [mode]);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedVideo(URL.createObjectURL(file));
        }
    };

    const removeVideo = () => {
        setSelectedVideo(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <>
            <Navbar />

            {/* HEADER */}
            <section className={Styles.headerSection}>
                <div className={Styles.headerContainer}>

                    <span className={Styles.badge}>
                        <MovieCreationIcon fontSize="small" />
                        Video Security Tool
                    </span>

                    <h1>Video Steganography</h1>

                    <p>
                        Securely hide and extract confidential information within video files using advanced steganography techniques. Preserve video quality while ensuring sensitive data remains invisible to unauthorized users.
                    </p>

                </div>
            </section>

            {/* TOGGLE */}
            <section>
                <Toggle mode={mode} setMode={setMode} />
            </section>

            {/* WORKSPACE */}
            <section className={Styles.uploadSection}>

                <div className={Styles.workspace}>

                    {/* LEFT SIDE - UPLOAD */}
                    <div className={Styles.uploadBox}>

                        {selectedVideo && (
                            <button
                                className={Styles.closeBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeVideo();
                                }}
                            >
                                <CloseIcon />
                            </button>
                        )}

                        {selectedVideo ? (
                            <video
                                src={selectedVideo}
                                controls
                                className={Styles.previewMedia}
                            />
                        ) : (
                            <>
                                <CloudUploadRoundedIcon className={Styles.uploadIcon} />
                                <h3>
                                    {mode === "encode"
                                        ? "Upload Video for Encoding"
                                        : "Upload Video for Decoding"}
                                </h3>

                                <p>Drag & drop or click to browse</p>
                                <span>MP4, MOV, WEBM</span>
                            </>
                        )}

                        {!selectedVideo && (
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="video/*"
                                className={Styles.fileInput}
                                onChange={handleVideoChange}
                            />
                        )}

                    </div>

                    {/* RIGHT SIDE - FORM */}
                    {mode === "encode" ? (
                        <div className={Styles.rightPanel}>

                            <textarea
                                className={Styles.textarea}
                                placeholder="Enter secret message..."
                            />

                            <input
                                type="password"
                                className={Styles.input}
                                placeholder="Password (optional)"
                            />

                            <div className={Styles.buttonRow}>
                                <button className={Styles.button}>
                                    Encode Video
                                </button>

                                <button
                                    className={Styles.downloadButton}
                                    disabled={!encodedVideo}
                                >
                                    Download Encrypted Video
                                </button>
                            </div>

                        </div>
                    ) : (
                        <div className={Styles.rightPanel}>

                            <input
                                type="password"
                                className={Styles.input}
                                placeholder="Enter password"
                            />

                            <button className={Styles.button}>
                                Decode Video
                            </button>

                        </div>
                    )}

                </div>

            </section>

            <Footer />
        </>
    )
}

export default VideoStego;