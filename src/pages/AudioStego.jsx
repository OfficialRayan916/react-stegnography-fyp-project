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
    const [selectedFile, setSelectedFile] = useState(null);

    const [secretMessage, setSecretMessage] = useState("");
    const [decodedMessage, setDecodedMessage] = useState("");

    const [password, setPassword] = useState("");
    const [decodePassword, setDecodePassword] = useState("");

    const [loading, setLoading] = useState(false);

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

            setEncodedAudio(null);
            setDecodedMessage("");

            setSelectedFile(file);
            setSelectedAudio(
                URL.createObjectURL(file)
            );
        }
    };

    const removeAudio = () => {
        setSelectedAudio(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleEncode = async () => {

        if (!selectedFile) {
            alert("Please select an audio file");
            return;
        }

        if (!secretMessage) {
            alert("Please enter a secret message");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            const user = {
                user_id: localStorage.getItem("user_id"),
                username: localStorage.getItem("username")
            };

            formData.append("audio", selectedFile);
            formData.append("message", secretMessage);
            formData.append("password", password);

            formData.append("user_id", user.user_id);
            formData.append("username", user.username);

            const response = await fetch(
                "https://web-production-2a8cd.up.railway.app/audio/encode",
                {
                    method: "POST",
                    body: formData
                }
            );

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            setEncodedAudio(url);

        } catch (error) {

            console.error(error);
            alert("Encoding failed");

        } finally {

            setLoading(false);

        }
    };

    const handleDownload = () => {

        if (!encodedAudio) return;

        const link = document.createElement("a");

        link.href = encodedAudio;
        link.download = "encoded_audio.wav";

        document.body.appendChild(link);

        link.click();

        link.remove();
    };

    const handleDecode = async () => {

        if (!selectedFile) {
            alert("Please select an audio file");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            const user = {
                user_id: localStorage.getItem("user_id"),
                username: localStorage.getItem("username")
            };

            formData.append("audio", selectedFile);
            formData.append("password", decodePassword);

            formData.append("user_id", user.user_id);
            formData.append("username", user.username);

            const response = await fetch(
                "https://web-production-2a8cd.up.railway.app/audio/decode",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (data.success) {
                setDecodedMessage(data.message);
            }
            else {
                alert(data.message);
            }

        } catch (error) {

            console.error(error);
            alert("Decode failed");

        } finally {

            setLoading(false);

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
                                accept=".wav,.mp3,.m4a"
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
                                value={secretMessage}
                                onChange={(e) =>
                                    setSecretMessage(e.target.value)
                                }
                            />

                            <input
                                type="password"
                                className={Styles.input}
                                placeholder="Password (optional)"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <div className={Styles.buttonRow}>
                                <button
                                    className={Styles.button}
                                    onClick={handleEncode}
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Encoding..."
                                        : "Encode Audio"}
                                </button>

                                <button
                                    className={Styles.downloadButton}
                                    disabled={!encodedAudio}
                                    onClick={handleDownload}
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
                                value={decodePassword}
                                onChange={(e) =>
                                    setDecodePassword(e.target.value)
                                }
                            />

                            <button
                                className={Styles.button}
                                onClick={handleDecode}
                                disabled={loading}
                            >
                                {loading
                                    ? "Decoding..."
                                    : "Decode Audio"}
                            </button>

                            <textarea
                                className={Styles.decodedTextarea}
                                placeholder="Decoded message will appear here..."
                                value={decodedMessage}
                                readOnly
                            />

                        </div>
                    )}

                </div>

            </section>

            <Footer />
        </>
    )
}

export default AudioStego;