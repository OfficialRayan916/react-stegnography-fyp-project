import React, { useState, useRef, useEffect } from 'react'
import Styles from "./VideoStego.module.css"
import Navbar from '../components/Navbar'
import Toggle from '../components/Toggle'
import Footer from '../components/Footer'

import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CloseIcon from "@mui/icons-material/Close";
import VideoFileIcon from "@mui/icons-material/VideoFile";

function VideoStego() {

    const [mode, setMode] = useState("encode");
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");

    const [encodedVideo, setEncodedVideo] = useState(null);
    const [decodedMessage, setDecodedMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const isAvi =
        videoFile?.name?.toLowerCase().endsWith(".avi");

    // RESET VIDEO WHEN MODE CHANGES
    useEffect(() => {
        setSelectedVideo(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [mode]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setVideoFile(file);
            setSelectedVideo(URL.createObjectURL(file));
        }
    };

    const removeVideo = () => {
        setSelectedVideo(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleEncode = async () => {

        if (!videoFile) {
            alert("Please select a video");
            return;
        }

        setLoading(true);

        const formData = new FormData();

        const user_id = localStorage.getItem("user_id");
        const username = localStorage.getItem("username");

        formData.append("user_id", user_id);
        formData.append("username", username);

        formData.append("video", videoFile);
        formData.append("message", message);
        formData.append("password", password);

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/video/encode",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error("Encoding failed");
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            setEncodedVideo(url);



        } catch (error) {

            console.error(error);

            alert("Encoding failed");
        } finally {

            setLoading(false);
        }
    };


    const handleDecode = async () => {

        if (!videoFile) {
            alert("Please select a video");
            return;
        }

        const formData = new FormData();

        const user_id = localStorage.getItem("user_id");
        const username = localStorage.getItem("username");

        formData.append("user_id", user_id);
        formData.append("username", username);

        formData.append("video", videoFile);
        formData.append("password", password);

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/video/decode",
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
        }
    };


    return (
        <>
            <Navbar />

            {loading && (
                <div className={Styles.loaderOverlay}>
                    <div className={Styles.loaderBox}>
                        <div className={Styles.spinner}></div>
                        <h3 className={Styles.spinnerHead}>Encoding Video...</h3>
                        <p className={Styles.spinnerPara}>Please wait while HideCrypt secures your data.</p>
                    </div>
                </div>
            )}


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

                            mode === "decode" ? (
                                <div className={Styles.decodeFileBox}>
                                    <VideoFileIcon className={Styles.decodeVideoIcon} />

                                    <h3>Video Uploaded</h3>

                                    <p>{videoFile?.name}</p>

                                    <span>Ready for decoding</span>
                                </div>

                            ) : (

                                <video
                                    src={selectedVideo}
                                    controls
                                    className={Styles.previewMedia}
                                />

                            )

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
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <input
                                type="password"
                                className={Styles.input}
                                placeholder="Password (optional)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div className={Styles.buttonRow}>
                                <button
                                    className={Styles.button}
                                    onClick={handleEncode}
                                    disabled={loading}
                                >
                                    {loading ? "Encoding..." : "Encode Video"}
                                </button>

                                <button
                                    className={Styles.downloadButton}
                                    disabled={!encodedVideo}
                                    onClick={() => {

                                        const link = document.createElement("a");

                                        link.href = encodedVideo;

                                        link.download = "encoded_video.mp4";

                                        link.click();
                                    }}
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

                            <button
                                className={Styles.button}
                                onClick={handleDecode}
                            >
                                Decode Video
                            </button>

                            <textarea
                                className={Styles.outputBox}
                                value={decodedMessage}
                                placeholder="Decoded secret message will appear here..."
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

export default VideoStego;