import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import darkModeMoonSvg from '../public/dark-mode-moon.svg'
import snorlax from '../public/snorlax.png'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles['navbar-container']}>
                <div className={styles['navbar-element-wrapper']}>
                    <div className={styles.name}>
                        <h1>
                            Wu Wei
                        </h1>
                    </div>
                    <div className={styles['dark-mode-button-wrapper']}>
                        <label className={styles.switch}>
                            <input type="checkbox"/>
                            <span className={`${styles.slider} ${styles.round}`}></span>
                            <span className={styles.sun}></span>
                            <span className={styles.moon}></span>
                        </label>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar