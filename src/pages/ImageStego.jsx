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
    const [decodedMessage, setDecodedMessage] = useState("");
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

    const handleEncode = async () => {

        if (!selectedFile) {
            alert("Please select an image");
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

            console.log("USER:", user);

            formData.append("image", selectedFile);
            formData.append("message", secretMessage);
            formData.append("password", password);

            formData.append("user_id", user.user_id);
            formData.append("username", user.username);

            const response = await fetch(
                "https://web-production-2a8cd.up.railway.app/image/encode",
                {
                    method: "POST",
                    body: formData
                }
            );

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            setEncodedImage(url);


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
                "https://web-production-2a8cd.up.railway.app/image/decode",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (data.success) {
                setDecodedMessage(data.message);
            } else {
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
                                        ? "Upload Image for Encoding"
                                        : "Upload Image for Decoding"}
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

                            <textarea
                                className={Styles.textarea}
                                placeholder="Enter secret message..."
                                value={secretMessage}
                                onChange={(e) => setSecretMessage(e.target.value)}
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
                                onChange={(e) => setDecodePassword(e.target.value)}
                            />

                            <button
                                className={Styles.button}
                                onClick={handleDecode}
                                disabled={loading}
                            >
                                {loading ? "Decoding..." : "Decode Image"}
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

export default ImageStego;