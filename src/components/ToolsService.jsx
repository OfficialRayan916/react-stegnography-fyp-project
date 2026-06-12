import { Link } from "react-router-dom";
import Styles from "./ToolsService.module.css";

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
            path: "/imageStego",
        },
        {
            image: AudioSteg,
            title: "Audio Steganography",
            description:
                "Embed secret information within audio files without noticeable changes to the sound output.",
            path: "/AudioStego",
        },
        {
            image: VideoSteg,
            title: "Video Steganography",
            description:
                "Protect sensitive data by concealing it inside video files using advanced steganographic techniques.",
            path: "/VideoStego",
        },
    ];

    return (
        <section className={Styles.servicesSection}>
            <div className={Styles.container}>
                <span className={Styles.subHeading}>OUR SERVICES</span>

                <h2 className={Styles.heading}>
                    Our Steganography Services
                </h2>

                <p className={Styles.headpara}>Explore our advanced steganography services and click **Get Started** to begin. We offer **Image**, **Audio**, and **Video Steganography**<br /> solutions that allow you to securely hide and retrieve confidential information while maintaining the quality,<br /> integrity, and security of your digital media.
                    .</p>

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