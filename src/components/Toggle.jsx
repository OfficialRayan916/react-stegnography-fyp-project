import React from "react";
import Styles from "./Toggle.module.css";


function Toogle({ mode, setMode }) {
    return (
        <section className={Styles.toggleSection}>
            <div className={Styles.toggleWrapper}>

                {/* Sliding Background */}
                <div
                    className={`${Styles.slider} ${mode === "decode" ? Styles.sliderRight : ""
                        }`}
                />

                <button
                    className={`${Styles.toggleBtn} ${mode === "encode" ? Styles.activeText : ""
                        }`}
                    onClick={() => setMode("encode")}
                >
                    Encode
                </button>

                <button
                    className={`${Styles.toggleBtn} ${mode === "decode" ? Styles.activeText : ""
                        }`}
                    onClick={() => setMode("decode")}
                >
                    Decode
                </button>

            </div>
        </section>
    );
}

export default Toogle;