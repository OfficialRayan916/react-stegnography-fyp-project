import react from "react";
import { Link } from "react-router-dom";
import styles from './Login.module.css';

function Login() {

  return (

    <section className={styles.section}>

        <div className={styles.head}>
            <h2>Welcome to HideCrypt!</h2>
            <p>Please sign-in to your account and start the<br /> adventure</p>
        </div>

        <div className={styles.inputBox}>
            <input type="email" className={styles.emailBox} placeholder="Email"  />
            <input type="password" className={styles.passwordBox} placeholder="Password"  />
        </div>

        <div className={styles.checkbox}>
            <div className={styles.remem}>
                <input type="checkbox" name={styles.remember} id="" />
                <label htmlFor="remember">Remember me</label>
            </div>
            <a href="">forgot password?</a>
        </div>

        <div className={styles.loginBtnDiv}>
            <button className={styles.loginBtn}>Log In</button>
        </div>

        <div className={styles.createAcc}>
            <p>New on our platform?</p>
            <Link to="/signup">Sign Up</Link>
        </div>

    </section>
  )
  
  
}

export default Login;
