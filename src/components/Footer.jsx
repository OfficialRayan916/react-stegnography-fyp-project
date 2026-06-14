import React from 'react'
import Styles from './Footer.module.css'

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
                    <a href="https://github.com/OfficialRayan916">Image Steganography</a>
                    <a href="https://github.com/OfficialRayan916">Audio Steganography</a>
                    <a href="https://github.com/OfficialRayan916">Video Steganography</a>
                    <a href="https://github.com/OfficialRayan916">Data Encryption</a>
                    <a href="https://github.com/OfficialRayan916">Secure Extraction</a>
                </div>

                <div className={Styles.column}>
                    <h4>Media Types</h4>
                    <a href="https://github.com/OfficialRayan916">PNG Images</a>
                    <a href="https://github.com/OfficialRayan916">JPEG Images</a>
                    <a href="https://github.com/OfficialRayan916">WAV Audio</a>
                    <a href="https://github.com/OfficialRayan916">MP4 Videos</a>
                    <a href="https://github.com/OfficialRayan916">Multi-Layer Security</a>
                </div>

                <div className={Styles.column}>
                    <h4>Resources</h4>
                    <a href="https://github.com/OfficialRayan916">Documentation</a>
                    <a href="https://github.com/OfficialRayan916">Research Papers</a>
                    <a href="https://github.com/OfficialRayan916">Project Guide</a>
                    <a href="https://github.com/OfficialRayan916">FAQs</a>
                    <a href="https://github.com/OfficialRayan916">Support Center</a>
                </div>

                <div className={Styles.column}>
                    <h4>Security</h4>
                    <a href="https://github.com/OfficialRayan916">AES Encryption</a>
                    <a href="https://github.com/OfficialRayan916">Password Protection</a>
                    <a href="https://github.com/OfficialRayan916">Data Integrity</a>
                    <a href="https://github.com/OfficialRayan916">Privacy Policy</a>
                    <a href="https://github.com/OfficialRayan916">Terms of Service</a>
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
