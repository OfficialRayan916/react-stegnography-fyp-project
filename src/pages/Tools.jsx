import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './Tools.module.css';
import Navbar from '../components/Navbar'
import ToolsService from '../components/ToolsService'
import Footer from '../components/Footer'


import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

import {
    FaImage,
    FaUpload,
    FaLock,
    FaDownload,
} from "react-icons/fa";

const steps = [
    {
        id: "01",
        title: "Choose Media Type",
        description:
            "Select Image, Audio, or Video Steganography based on your security and communication requirements.",
        icon: <FaImage />,
    },
    {
        id: "02",
        title: "Upload Cover File",
        description:
            "Upload a media file that will act as the carrier for embedding or extracting hidden information.",
        icon: <FaUpload />,
    },
    {
        id: "03",
        title: "Hide or Extract Data",
        description:
            "Securely embed confidential messages into the selected media file or retrieve previously hidden content.",
        icon: <FaLock />,
    },
    {
        id: "04",
        title: "Download Results",
        description:
            "Save the generated stego media file or extracted information directly to your device.",
        icon: <FaDownload />,
    },
];


function Tools() {
    return (
        <>
            <section>
                <Navbar />
            </section>

            <section>
                <div className={Styles.heroSection}>

                    <SecurityOutlinedIcon className={Styles.heroIcon} />

                    <h1 className={Styles.heading}>
                        Steganography Tools
                    </h1>

                    <p className={Styles.subHeading}>
                        Securely hide and extract confidential information using steganography techniques across images, audio, and video files. HideCrypt lets users embed secret messages without affecting media quality, ensuring complete invisibility and security through a simple and easy-to-use interface.
                    </p>

                    <div className={Styles.buttonGroup}>
                        <Link to="/Tools#ourServices" className={Styles.primaryBtn}>Get Started</Link>
                        <Link to="/Tools#Guides" className={Styles.secondaryBtn}>How It Works</Link>
                    </div>

                    <div className={Styles.iconRow}>
                        <div><ImageOutlinedIcon /> Image</div>
                        <div><AudiotrackOutlinedIcon /> Audio</div>
                        <div><MovieOutlinedIcon /> Video</div>
                    </div>

                </div>
            </section>

            <section className={Styles.section}>
                <div id='Guides' className={Styles.container}>
                    <h2 className={Styles.heading}>How It Works</h2>

                    <p className={Styles.subHeading}>
                        Protect sensitive information by securely embedding messages into
                        images, audio, and video files. Follow a simple four-step process to
                        hide or retrieve data while preserving media quality and ensuring
                        confidentiality.
                    </p>

                    <div className={Styles.timeline}>
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`${Styles.item} ${index % 2 === 0 ? Styles.right : Styles.left
                                    }`}
                            >
                                <div className={Styles.content}>
                                    <div className={Styles.icon}>{step.icon}</div>

                                    <div>
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                </div>

                                <div className={Styles.number}>{step.id}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <ToolsService />
            </section>

            <section>
                <Footer />
            </section>
        </>
    )
}

export default Tools
