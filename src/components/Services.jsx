import { Link } from "react-router-dom";
import Styles from "./Services.module.css";

import ImageSteg from "../Assets/image-service.png";
import AudioSteg from "../Assets/audio-service.png";
import VideoSteg from "../Assets/video-service.png";


const Services = () => {
    const services = [
        {
            image: ImageSteg,
            title: "Image Steganography",
            description:
                "Securely hide confidential messages inside images while preserving their original appearance and quality.",
            path: "/image-steganography",
        },
        {
            image: AudioSteg,
            title: "Audio Steganography",
            description:
                "Embed secret information within audio files without noticeable changes to the sound output.",
            path: "/audio-steganography",
        },
        {
            image: VideoSteg,
            title: "Video Steganography",
            description:
                "Protect sensitive data by concealing it inside video files using advanced steganographic techniques.",
            path: "/video-steganography",
        },
    ];

    return (
        <section className={Styles.servicesSection}>
            <div className={Styles.container}>
                <span className={Styles.subHeading}>OUR SERVICES</span>

                <h2 className={Styles.heading}>
                    Secure Data Hiding with HideCrypt
                </h2>

                <p className={Styles.headpara}>HideCrypt is an advanced steganography platform that enables secure embedding of confidential data inside images, audio, and video files. Designed with modern encryption techniques, it ensures that hidden information remains invisible, protected, and undetectable while maintaining original media quality.</p>

                <div className={Styles.cards}>
                    {services.map((service, index) => (
                        <div className={Styles.card} key={index}>
                            <img
                                src={service.image}
                                alt={service.title}
                                className={Styles.cardImage}
                            />

                            <h3>{service.title}</h3>

                            <p>{service.description}</p>

                            <Link
                                to={service.path}
                                className={Styles.button}
                            >
                                {service.buttonText}
                                Get Started
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;