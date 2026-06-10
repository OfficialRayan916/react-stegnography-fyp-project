import React from 'react'
import Styles from './Footer.module.css'
import { Link, Links } from 'react-router-dom'

import {
    FaInstagram,
    FaFacebookF,
    FaLinkedinIn,
    FaGithub,
    FaYoutube,
} from "react-icons/fa";

function footer() {
    return (
        <footer className={Styles.footer}>
            <div className={Styles.wave}></div>

            <div className={Styles.footerContent}>
                <div className={Styles.column}>
                    <h4>Features</h4>
                    <a href="#">Image Steganography</a>
                    <a href="#">Audio Steganography</a>
                    <a href="#">Video Steganography</a>
                    <a href="#">Data Encryption</a>
                    <a href="#">Secure Extraction</a>
                </div>

                <div className={Styles.column}>
                    <h4>Media Types</h4>
                    <a href="#">PNG Images</a>
                    <a href="#">JPEG Images</a>
                    <a href="#">WAV Audio</a>
                    <a href="#">MP4 Videos</a>
                    <a href="#">Multi-Layer Security</a>
                </div>

                <div className={Styles.column}>
                    <h4>Resources</h4>
                    <a href="#">Documentation</a>
                    <a href="#">Research Papers</a>
                    <a href="#">Project Guide</a>
                    <a href="#">FAQs</a>
                    <a href="#">Support Center</a>
                </div>

                <div className={Styles.column}>
                    <h4>Security</h4>
                    <a href="#">AES Encryption</a>
                    <a href="#">Password Protection</a>
                    <a href="#">Data Integrity</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>

                <div className={Styles.newsletter}>
                    <h4>Stay Updated</h4>
                    <p>
                        Get updates about new steganography techniques, security features,
                        and project improvements.
                    </p>

                    <div className={Styles.subscribe}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                        />
                        <button>Subscribe</button>
                    </div>

                    <div className={Styles.socials}>
                        <FaInstagram />
                        <FaFacebookF />
                        <FaLinkedinIn />
                        <FaGithub />
                        <FaYoutube />
                    </div>
                </div>
            </div>

            <div className={Styles.bottom}>
                <p>© 2026 HideCrypt. All Rights Reserved.</p>

                <div>
                    <span>Privacy Policy</span>
                    <span>Terms & Conditions</span>
                    <span>Contact Us</span>
                </div>
            </div>
        </footer>
    );
};


export default footer
