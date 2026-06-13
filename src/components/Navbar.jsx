import React from 'react'
import Styles from './Navbar.module.css'
import { Link, Links } from 'react-router-dom'


function Navbar() {
    return (

        <section className={Styles.navbar}>

            <div className={Styles.navHead}>
                <h3>Hide <span className={Styles.navHeadCrypt}>Crypt</span></h3>
            </div>

            <div className={Styles.containerPageNames}>

                <Link>Home</Link>
                <Link to="Tools">Tools</Link>
                <Link>Guide</Link>
                <Link>Features</Link>

            </div>

            <div className={Styles.containerLoginSignin}>

                <div className={Styles.loginBtn}>
                    <Link>Login</Link>
                </div>

                <div className={Styles.signinBtn}>
                    <Link>Sign In</Link>
                </div>

            </div>

        </section>
    )
}

export default Navbar
