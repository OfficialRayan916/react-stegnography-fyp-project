import React from 'react'
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";
import Services from '../components/Services';
import Tools from './Tools';
import Styles from './Home.module.css'
import { Link } from 'react-router-dom'

import {
  FaImage,
  FaMusic,
  FaVideo,
  FaLock,
  FaKey,
  FaShieldAlt,
  FaFileExport,
  FaUserSecret,
} from "react-icons/fa";

const features = [
  {
    icon: <FaImage />,
    title: "Image Steganography",
    desc: "Hide confidential messages inside digital images while preserving image quality.",
  },
  {
    icon: <FaMusic />,
    title: "Audio Steganography",
    desc: "Embed secret information securely within audio files without noticeable changes.",
  },
  {
    icon: <FaVideo />,
    title: "Video Steganography",
    desc: "Conceal sensitive data inside video frames for enhanced security.",
  },
  {
    icon: <FaLock />,
    title: "AES Encryption",
    desc: "Protect hidden data using strong encryption before embedding.",
  },
  {
    icon: <FaKey />,
    title: "Password Security",
    desc: "Ensure only authorized users can access embedded information.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Data Protection",
    desc: "Maintain confidentiality and integrity of sensitive information.",
  },
  {
    icon: <FaFileExport />,
    title: "Data Extraction",
    desc: "Quickly retrieve hidden messages from media files when required.",
  },
  {
    icon: <FaUserSecret />,
    title: "Privacy Assurance",
    desc: "Designed to support secure communication and private data sharing.",
  },
];

function Home() {
  return (
    <>
      <section className={Styles.firstSection}>


        <Navbar />

        <div className={Styles.heroSection}>

          <div className={Styles.heroSecHP}>
            <h1>Hide More Than Meets The Eye</h1>
            <p>Your all-in-one steganography platform for securely hiding and extracting secret messages within images, audio, and video files. HideCrypt ensures that sensitive information remains invisible while maintaining the original quality of media, providing a simple yet powerful solution for secure digital communication.</p>
          </div>

          <div className={Styles.heroSecBtn}>

            <div className={Styles.heroSecBtn1}>
              <Link to="/#Features">Features</Link>
            </div>

            <div className={Styles.heroSecBtn2}>
              <Link to="./Tools">Try Tools</Link>
            </div>

          </div>

        </div>



      </section>

      <section className={Styles.Features}>
        <div className={Styles.Container}>
          <div id='Features' className={Styles.Header}>
            <span className={Styles.Badge}>
              ✦ Our Features
            </span>

            <h2>
              Secure Information Hiding
              <br />
              Using Advanced Steganography
            </h2>

            <p>
              Protect sensitive information through Image, Audio and Video
              Steganography with secure encryption and extraction techniques.
            </p>
          </div>

          <div className={Styles.Grid}>
            {features.map((item, index) => (
              <div className={Styles.Card} key={index}>
                <div className={Styles.Icon}>
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={Styles.BottomText}>
            StegoSecure provides modern data hiding solutions for secure digital communication.
          </div>
        </div>
      </section>

      <Services />


      <Footer />

    </>
  )
}

export default Home
