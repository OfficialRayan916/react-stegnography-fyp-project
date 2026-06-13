import React, { useState, useRef, useEffect } from 'react'
import Styles from "./AudioStego.module.css"
import Navbar from '../components/Navbar'
import Toggle from '../components/Toggle'
import Footer from '../components/Footer'

import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CloseIcon from "@mui/icons-material/Close";

function AudioStego() {

    const [mode, setMode] = useState("encode");
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [encodedAudio, setEncodedAudio] = useState(null);

    const fileInputRef = useRef(null);

    // RESET WHEN MODE CHANGES
    useEffect(() => {
        setSelectedAudio(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [mode]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAudioChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedAudio(URL.createObjectURL(file));
        }
    };

    const removeAudio = () => {
        setSelectedAudio(null);

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
                        <AudiotrackIcon fontSize="small" />
                        Audio Security Tool
                    </span>

                    <h1>Audio Steganography</h1>

                    <p>
                        Securely hide and extract confidential messages inside audio files using advanced steganography techniques while preserving audio quality.
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

                        {selectedAudio && (
                            <button
                                className={Styles.closeBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeAudio();
                                }}
                            >
                                <CloseIcon />
                            </button>
                        )}

                        {selectedAudio ? (
                            <audio
                                src={selectedAudio}
                                controls
                                className={Styles.previewMedia}
                            />
                        ) : (
                            <>
                                <CloudUploadRoundedIcon className={Styles.uploadIcon} />
                                <h3>
                                    {mode === "encode"
                                        ? "Upload Audio for Encoding"
                                        : "Upload Audio for Decoding"}
                                </h3>

                                <p>Drag & drop or click to browse</p>
                                <span>MP3, WAV, M4A</span>
                            </>
                        )}

                        {!selectedAudio && (
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="audio/*"
                                className={Styles.fileInput}
                                onChange={handleAudioChange}
                            />
                        )}

                    </div>

                    {/* RIGHT SIDE */}
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
                                    Encode Audio
                                </button>

                                <button
                                    className={Styles.downloadButton}
                                    disabled={!encodedAudio}
                                >
                                    Download Encrypted Audio
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
                                Decode Audio
                            </button>

                        </div>
                    )}

                </div>

            </section>

            <Footer />
        </>
    )
}

export default AudioStego;