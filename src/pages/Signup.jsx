import react from "react";
import { Link } from "react-router-dom";
import styles from './Signup.module.css';

function Signup() {

    return (

        <section className={styles.signup}>

            <div className={styles.section}>

                <div className={styles.head}>
                    <h2>HideCrypt starts here</h2>
                    <p>Make your app Hidecrypt easy and secure!</p>
                </div>

                <div className={styles.inputBox}>
                    <input type="username" className={styles.userBox} placeholder="Username" />
                    <input type="email" className={styles.emailBox} placeholder="Email" />
                    <input type="password" className={styles.passwordBox} placeholder="Password" />
                </div>

                <div className={styles.checkbox}>
                    <input type="checkbox" name={styles.remember} id="" />
                    <a href=""><span className={styles.agree}>I agree to</span> privacy policy & terms</a>
                </div>

                <div className={styles.loginBtnDiv}>
                    <button className={styles.loginBtn}>Log In</button>
                </div>

                <div className={styles.createAcc}>
                    <p>Already have an account?</p>
                    <Link to="/">Sign in instead</Link>
                </div>

            </div>

        </section>
    )


}

export default Signup;
