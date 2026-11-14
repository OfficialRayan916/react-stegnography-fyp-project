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

    const [secretMessage, setSecretMessage] = useState("");
    const [payloadType, setPayloadType] = useState("text");

    const [secretImage, setSecretImage] = useState(null);
    const [secretAudio, setSecretAudio] = useState(null);

    const [decodedType, setDecodedType] = useState("");
    const [decodedImage, setDecodedImage] = useState(null);
    const [decodedAudio, setDecodedAudio] = useState(null);
    const [password, setPassword] = useState("");
    const [decodePassword, setDecodePassword] = useState("");

    const [encodedVideo, setEncodedVideo] = useState(null);
    const [decodedMessage, setDecodedMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Encoding Video...");

    const fileInputRef = useRef(null);
    const secretFileInputRef = useRef(null);

    // RESET WHEN MODE CHANGES
    useEffect(() => {

        // Left upload
        setSelectedVideo(null);
        setVideoFile(null);

        // Encode
        setSecretMessage("");
        setSecretImage(null);
        setSecretAudio(null);
        setPayloadType("text");

        // Password
        setPassword("");
        setDecodePassword("");

        // Encoded video
        setEncodedVideo(null);

        // Decode
        setDecodedMessage("");
        setDecodedType("");
        setDecodedImage(null);
        setDecodedAudio(null);

        // Clear file inputs
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        if (secretFileInputRef.current) {
            secretFileInputRef.current.value = "";
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
        setVideoFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleEncode = async () => {

        if (!videoFile) {
            alert("Please select a video");
            return;
        }

        if (payloadType === "text" && !secretMessage) {
            alert("Please enter a secret message");
            return;
        }

        if (payloadType === "image" && !secretImage) {
            alert("Please select a secret image");
            return;
        }

        if (payloadType === "audio" && !secretAudio) {
            alert("Please select a secret audio");
            return;
        }

        setLoadingText("Encoding Video...");
        setLoading(true);

        const formData = new FormData();

        const user_id = localStorage.getItem("user_id");
        const username = localStorage.getItem("username");

        formData.append("user_id", user_id);
        formData.append("username", username);

        formData.append("video", videoFile);

        if (payloadType === "text") {
            formData.append("message", secretMessage);
        }
        else if (payloadType === "image") {
            formData.append("secret_image", secretImage);
        }
        else if (payloadType === "audio") {
            formData.append("secret_audio", secretAudio);
        }

        formData.append("password", password);
        formData.append("payload_type", payloadType);

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

        setLoadingText("Decoding Video...");
        setLoading(true);

        const formData = new FormData();

        const user_id = localStorage.getItem("user_id");
        const username = localStorage.getItem("username");

        formData.append("user_id", user_id);
        formData.append("username", username);

        formData.append("video", videoFile);
        formData.append("password", decodePassword);

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

                if (data.type === "text") {

                    setDecodedType("text");

                    setDecodedMessage(data.message);

                    setDecodedImage(null);

                    setDecodedAudio(null);

                }

                else if (data.type === "image") {

                    const imageUrl =
                        `data:image/${data.extension};base64,${data.image}`;

                    setDecodedType("image");

                    setDecodedMessage("");

                    setDecodedAudio(null);

                    setDecodedImage(imageUrl);

                }

                else if (data.type === "audio") {

                    const binary = atob(data.audio);

                    const bytes = new Uint8Array(binary.length);

                    for (let i = 0; i < binary.length; i++) {
                        bytes[i] = binary.charCodeAt(i);
                    }

                    const blob = new Blob(
                        [bytes],
                        {
                            type: `audio/${data.extension}`
                        }
                    );

                    const url = URL.createObjectURL(blob);

                    setDecodedType("audio");

                    setDecodedMessage("");

                    setDecodedImage(null);

                    setDecodedAudio(url);

                }

                setDecodePassword("");

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

    const handleSecretFile = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (payloadType === "image") {

            setSecretImage(file);
            setSecretAudio(null);

        }
        else if (payloadType === "audio") {

            setSecretAudio(file);
            setSecretImage(null);

        }
    };

    const removeSecretImage = () => {

        setSecretImage(null);

        if (secretFileInputRef.current) {

            secretFileInputRef.current.value = "";

        }
    };

    const removeSecretAudio = () => {

        setSecretAudio(null);

        if (secretFileInputRef.current) {

            secretFileInputRef.current.value = "";

        }
    };


    return (
        <>
            <Navbar />

            {loading && (
                <div className={Styles.loaderOverlay}>
                    <div className={Styles.loaderBox}>
                        <div className={Styles.spinner}></div>
                        <h3 className={Styles.spinnerHead}>{loadingText}</h3>

                        <p className={Styles.spinnerPara}>
                            {loadingText === "Encoding Video..."
                                ? "Please wait while HideCrypt secures your data."
                                : "Please wait while HideCrypt extracts your hidden message."
                            }
                        </p>
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

                            <div className={Styles.payloadToggle}>

                                <button
                                    className={`${Styles.payloadButton} ${payloadType === "text" ? Styles.activePayload : ""
                                        }`}
                                    onClick={() => {
                                        setPayloadType("text");
                                        setPassword("");
                                    }}
                                >
                                    Text
                                </button>

                                <button
                                    className={`${Styles.payloadButton} ${payloadType === "image" ? Styles.activePayload : ""
                                        }`}
                                    onClick={() => {
                                        setPayloadType("image");
                                        setPassword("");
                                    }}
                                >
                                    Image
                                </button>

                                <button
                                    className={`${Styles.payloadButton} ${payloadType === "audio" ? Styles.activePayload : ""
                                        }`}
                                    onClick={() => {
                                        setPayloadType("audio");
                                        setPassword("");
                                    }}
                                >
                                    Audio
                                </button>

                            </div>

                            {payloadType === "text" && (
                                <textarea
                                    className={Styles.textarea}
                                    placeholder="Enter secret message..."
                                    value={secretMessage}
                                    onChange={(e) => setSecretMessage(e.target.value)}
                                />
                            )}

                            {payloadType === "image" && (
                                <div className={Styles.secretUploadBox}>

                                    {secretImage && (

                                        <button
                                            className={Styles.closeBtn}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeSecretImage();
                                            }}
                                        >
                                            <CloseIcon />
                                        </button>

                                    )}

                                    {secretImage ? (

                                        <div className={Styles.secretImageWrapper}>
                                            <img
                                                src={URL.createObjectURL(secretImage)}
                                                alt="Secret Preview"
                                                className={Styles.secretPreview}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>

                                    ) : (

                                        <>
                                            <CloudUploadRoundedIcon className={Styles.uploadIcon} />
                                            <h3>Upload Secret Image</h3>
                                            <p>PNG, JPG, JPEG</p>
                                        </>

                                    )}



                                    {!secretImage && (
                                        <input
                                            ref={secretFileInputRef}
                                            type="file"
                                            accept=".png,.jpg,.jpeg"
                                            className={Styles.fileInput}
                                            onChange={handleSecretFile}
                                        />
                                    )}
                                </div>
                            )}

                            {payloadType === "audio" && (
                                <div className={Styles.secretUploadBox}>


                                    {secretAudio && (

                                        <button
                                            className={Styles.closeBtn}
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                removeSecretAudio();

                                            }}
                                        >
                                            <CloseIcon />
                                        </button>

                                    )}

                                    {secretAudio ? (

                                        <audio
                                            controls
                                            src={URL.createObjectURL(secretAudio)}
                                            className={Styles.audioPlayer}
                                            onClick={(e) => e.stopPropagation()}
                                        />

                                    ) : (

                                        <>
                                            <CloudUploadRoundedIcon className={Styles.uploadIcon} />

                                            <h3>Upload Secret Audio</h3>

                                            <p>MP3 • WAV • M4A</p>
                                        </>

                                    )}

                                    {!secretAudio && (
                                        <input
                                            ref={secretFileInputRef}
                                            type="file"
                                            accept=".mp3,.wav,.m4a"
                                            className={Styles.fileInput}
                                            onChange={handleSecretFile}
                                        />
                                    )}

                                </div>
                            )}

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

                                        link.download = "encoded_video.avi";

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
                                value={decodePassword}
                                onChange={(e) => setDecodePassword(e.target.value)}
                            />

                            <button
                                className={Styles.button}
                                onClick={handleDecode}
                            >
                                Decode Video
                            </button>

                            {decodedType === "text" && (
                                <textarea
                                    className={Styles.outputBox}
                                    value={decodedMessage}
                                    readOnly
                                />
                            )}

                            {decodedType === "image" && decodedImage && (
                                <div className={Styles.decodedPreviewBox}>

                                    <img
                                        src={decodedImage}
                                        alt="Decoded"
                                        className={Styles.decodedPreview}
                                    />

                                    <a
                                        href={decodedImage}
                                        download="decoded_image.jpg"
                                        className={Styles.downloadButton}
                                    >
                                        Download Image
                                    </a>

                                </div>
                            )}

                            {decodedType === "audio" && decodedAudio && (
                                <div className={Styles.decodedPreviewBox}>

                                    <audio
                                        controls
                                        src={decodedAudio}
                                        className={Styles.audioPlayer}
                                    />

                                    <button
                                        className={Styles.downloadButton}
                                        onClick={() => {

                                            const link = document.createElement("a");

                                            link.href = decodedAudio;

                                            link.download = "decoded_audio.mp3";

                                            link.click();

                                        }}
                                    >
                                        Download Audio
                                    </button>

                                </div>
                            )}

                        </div>
                    )}

                </div>

            </section>

            <Footer />
        </>
    )
}

export default VideoStego;