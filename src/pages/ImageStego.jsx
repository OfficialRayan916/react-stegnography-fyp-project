import React, { useState, useRef, useEffect } from 'react'
import Styles from "./ImageStego.module.css"
import Navbar from '../components/Navbar'
import Toggle from '../components/Toggle'
import Footer from '../components/Footer'

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CloseIcon from "@mui/icons-material/Close";

function ImageStego() {

    const [mode, setMode] = useState("encode");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [secretMessage, setSecretMessage] = useState("");
    const [payloadType, setPayloadType] = useState("text");

    const [secretImage, setSecretImage] = useState(null);
    const [secretAudio, setSecretAudio] = useState(null);

    const secretFileInputRef = useRef(null);

    const [decodedMessage, setDecodedMessage] = useState("");
    const [decodedType, setDecodedType] = useState("");

    const [decodedImage, setDecodedImage] = useState(null);

    const [decodedAudio, setDecodedAudio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [encodedImage, setEncodedImage] = useState(null);

    const [password, setPassword] = useState("");
    const [decodePassword, setDecodePassword] = useState("");

    const fileInputRef = useRef(null);

    // RESET IMAGE WHEN MODE CHANGES
    useEffect(() => {
        setSelectedImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [mode]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setEncodedImage(null);
            setDecodedMessage("");

            setSelectedFile(file);
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setSelectedImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
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

    const handleEncode = async () => {

        setEncodedImage(null);

        if (!selectedFile) {
            alert("Please select an image");
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

            alert("Please select a secret audio file");

            return;

        }

        try {

            setLoading(true);

            const formData = new FormData();

            const user = {
                user_id: localStorage.getItem("user_id"),
                username: localStorage.getItem("username")
            };

            console.log("USER:", user);

            formData.append("image", selectedFile);
            formData.append("image", selectedFile);

            formData.append("payload_type", payloadType);

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

            formData.append("user_id", user.user_id);
            formData.append("username", user.username);

            formData.append("user_id", user.user_id);
            formData.append("username", user.username);

            const response = await fetch(
                "http://127.0.0.1:5000/image/encode",
                {
                    method: "POST",
                    body: formData
                }
            );

            // If the backend returned an error (JSON)
            if (!response.ok) {

                const errorData = await response.json();

                alert(errorData.message);

                setEncodedImage(null);

                return;
            }

            // Success → backend returned the encoded image
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            setEncodedImage(url);

            setPassword("");


        } catch (error) {

            console.error(error);
            alert("Encoding failed");

        } finally {

            setLoading(false);

        }
    };

    const handleDownload = () => {

        if (!encodedImage) return;

        const link = document.createElement("a");

        link.href = encodedImage;
        link.download = "encoded_image.png";

        document.body.appendChild(link);

        link.click();

        link.remove();
    };

    const handleDecode = async () => {

        if (!selectedFile) {
            alert("Please select an image");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            const user = {
                user_id: localStorage.getItem("user_id"),
                username: localStorage.getItem("username")
            };

            formData.append("image", selectedFile);
            formData.append("password", decodePassword);

            formData.append("user_id", user.user_id);
            formData.append("username", user.username);

            const response = await fetch(
                "http://127.0.0.1:5000/image/decode",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();
            console.log("DECODE RESPONSE:", data);

            console.log(JSON.stringify(data, null, 2));

            if (data.success) {

                if (data.type === "text") {

                    setDecodedType("text");

                    setDecodedMessage(data.message);

                    setDecodedImage(null);

                    setDecodedAudio(null);

                }

                else if (data.type === "image") {

                    setDecodedType("image");

                    setDecodedMessage("");

                    setDecodedAudio(null);

                    setDecodedImage(
                        `data:image/${data.extension};base64,${data.image}`
                    );

                }

                else if (data.type === "audio") {

                    setDecodedType("audio");

                    setDecodedMessage("");

                    setDecodedImage(null);

                    const binary = atob(data.audio);

                    const bytes = new Uint8Array(binary.length);

                    for (let i = 0; i < binary.length; i++) {
                        bytes[i] = binary.charCodeAt(i);
                    }

                    let mimeType = "audio/mpeg";

                    if (data.extension === "wav")
                        mimeType = "audio/wav";

                    else if (data.extension === "m4a")
                        mimeType = "audio/mp4";

                    else if (data.extension === "aac")
                        mimeType = "audio/aac";

                    const blob = new Blob([bytes], {
                        type: mimeType
                    });

                    const url = URL.createObjectURL(blob);

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


    return (
        <>
            <Navbar />

            {/* HEADER */}
            <section className={Styles.headerSection}>
                <div className={Styles.headerContainer}>

                    <span className={Styles.badge}>
                        <ImageOutlinedIcon fontSize="small" />
                        Image Security Tool
                    </span>

                    <h1>Image Steganography</h1>

                    <p>
                        Securely hide and extract confidential information within image files using advanced steganography techniques. Preserve image quality while ensuring sensitive data remains protected and invisible to unauthorized users.
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

                        {selectedImage && (
                            <button
                                className={Styles.closeBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage();
                                }}
                            >
                                <CloseIcon />
                            </button>
                        )}

                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="preview"
                                className={Styles.previewImage}
                            />
                        ) : (
                            <>
                                <CloudUploadRoundedIcon className={Styles.uploadIcon} />
                                <h3>
                                    {mode === "encode"
                                        ? "Upload Cover Image"
                                        : "Upload Encoded Image"}
                                </h3>

                                <p>Drag & drop or click to browse</p>
                                <span>PNG, JPG, JPEG</span>
                            </>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            className={Styles.fileInput}
                            onChange={handleImageChange}
                        />

                    </div>

                    {/* RIGHT SIDE - FORM */}
                    {mode === "encode" ? (
                        <div className={Styles.rightPanel}>

                            <div className={Styles.payloadToggle}>

                                <button
                                    className={`${Styles.payloadButton} ${payloadType === "text" ? Styles.activePayload : ""}`}
                                    onClick={() => setPayloadType("text")}
                                >
                                    Text
                                </button>

                                <button
                                    className={`${Styles.payloadButton} ${payloadType === "image" ? Styles.activePayload : ""}`}
                                    onClick={() => setPayloadType("image")}
                                >
                                    Image
                                </button>

                                <button
                                    className={`${Styles.payloadButton} ${payloadType === "audio" ? Styles.activePayload : ""}`}
                                    onClick={() => setPayloadType("audio")}
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

                                        <img
                                            src={URL.createObjectURL(secretImage)}
                                            alt="Secret Preview"
                                            className={Styles.secretPreview}
                                        />

                                    ) : (

                                        <>
                                            <CloudUploadRoundedIcon className={Styles.uploadIcon} />

                                            <h3>Upload Secret Image</h3>

                                            <p>PNG, JPG, JPEG</p>
                                        </>

                                    )}

                                    <input
                                        ref={secretFileInputRef}
                                        type="file"
                                        accept=".png,.jpg,.jpeg"
                                        className={Styles.fileInput}
                                        onChange={handleSecretFile}
                                    />

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
                                        />

                                    ) : (

                                        <>

                                            <CloudUploadRoundedIcon className={Styles.uploadIcon} />

                                            <h3>Upload Secret Audio</h3>

                                            <p>MP3 • WAV • M4A</p>

                                        </>

                                    )}

                                    <input
                                        ref={secretFileInputRef}
                                        type="file"
                                        accept=".mp3,.wav,.m4a"
                                        className={Styles.fileInput}
                                        onChange={handleSecretFile}
                                    />

                                </div>

                            )}
                            <input
                                type="password"
                                className={Styles.input}
                                placeholder="Password (optional)"
                                value={password}
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <div className={Styles.buttonRow}>
                                <button
                                    className={Styles.button}
                                    onClick={handleEncode}
                                    disabled={loading}
                                >
                                    {loading ? "Encoding..." : "Encode Image"}
                                </button>

                                <button
                                    className={Styles.downloadButton}
                                    disabled={!encodedImage}
                                    onClick={handleDownload}
                                >
                                    Download Encrypted Image
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
                                autoComplete="new-password"
                                onChange={(e) => setDecodePassword(e.target.value)}
                            />

                            <button
                                className={Styles.button}
                                onClick={handleDecode}
                                disabled={loading}
                            >
                                {loading ? "Decoding..." : "Decode Image"}
                            </button>

                            {decodedType === "text" && (

                                <textarea
                                    className={Styles.decodedTextarea}
                                    placeholder="Decoded message will appear here..."
                                    value={decodedMessage}
                                    readOnly
                                />

                            )}

                            {decodedType === "image" && (

                                <div className={Styles.decodedPreviewBox}>

                                    <img
                                        src={decodedImage}
                                        alt="Decoded"
                                        className={Styles.decodedPreview}
                                    />

                                    <button
                                        className={Styles.button}
                                        onClick={() => {

                                            const link = document.createElement("a");

                                            link.href = decodedImage;

                                            link.download = "decoded_image.png";

                                            link.click();

                                        }}
                                    >
                                        Download Image
                                    </button>

                                </div>

                            )}

                            {decodedType === "audio" && (

                                <div className={Styles.decodedPreviewBox}>

                                    <audio
                                        controls
                                        src={decodedAudio}
                                        className={Styles.audioPlayer}
                                    />

                                    <button
                                        className={Styles.button}
                                        onClick={() => {

                                            const link = document.createElement("a");

                                            link.href = decodedAudio;

                                            link.download = "decoded_audio.wav";

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

export default ImageStego;