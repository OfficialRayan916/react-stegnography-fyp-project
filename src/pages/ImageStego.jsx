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
    const [encodedImage, setEncodedImage] = useState(null);

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
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setSelectedImage(null);

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
                            accept="image/*"
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
                            />

                            <input
                                type="password"
                                className={Styles.input}
                                placeholder="Password (optional)"
                            />

                            <div className={Styles.buttonRow}>
                                <button className={Styles.button}>
                                    Encode Image
                                </button>

                                <button
                                    className={Styles.downloadButton}
                                    disabled={!encodedImage}
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
                            />

                            <button className={Styles.button}>
                                Decode Image
                            </button>

                        </div>
                    )}

                </div>

            </section>

            <Footer />
        </>
    )
}

export default ImageStego;