import React from 'react'
import Styles from './Navbar.module.css'
import { Link } from 'react-router-dom'


function Navbar() {
    return (

        <section className={Styles.navbar}>

            <div className={Styles.navHead}>
                <Link to="/">
                    <h3>Hide <span className={Styles.navHeadCrypt}>Crypt</span></h3>
                </Link>
            </div>

            <div className={Styles.containerPageNames}>

                <Link to="/">Home</Link>
                <Link to="/Tools">Tools</Link>
                <Link to="/Tools#Guides">Guide</Link>
                <Link to="/#Features">Features</Link>

            </div>

            <div className={Styles.containerLoginSignin}>

                <div className={Styles.loginBtn}>
                    <Link to="/Login">Login</Link>
                </div>

                <div className={Styles.signinBtn}>
                    <Link to="/SignUp">Sign In</Link>
                </div>

            </div>

        </section>
    )
}

export default Navbar
