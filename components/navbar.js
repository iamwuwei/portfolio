import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import earthSvg from '../public/earth-globe.svg'
import snorlax from '../public/snorlax.png'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles['navbar-container']}>
                <div className={styles['navbar-element-wrapper']}>
                    <div className={styles.name}>
                        <div className={styles.snorlax}>
                            <Image src={snorlax} ></Image>
                        </div>
                        <h1>
                            Wu Wei
                        </h1>
                    </div>
                    <div className={styles['button-container']}>
                        <div className={`${styles['button-wrapper']} ${styles.earth}`}>
                            <div className={styles.dropdown}>
                                <Image src={earthSvg} className={styles.dropbtn}></Image>
                                <div className={styles['dropdown-content']}>
                                    <a href="#">日本語</a>
                                    <a href="#">English</a>
                                    <a href="#">繁體中文</a>
                                </div>
                            </div>
                        </div>
                        <div className={styles['button-wrapper']}>
                            <label className={styles.switch}>
                                <input type="checkbox" />
                                <span className={`${styles.slider} ${styles.round}`}></span>
                                <span className={styles.sun}></span>
                                <span className={styles.moon}></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar