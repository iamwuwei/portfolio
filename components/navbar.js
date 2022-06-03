import Link from 'next/link'
import {useState, useEffect} from 'react'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import earthSvg from '../public/earth-globe.svg'
import snorlax from '../public/snorlax.png'

const Navbar = () => {
    const [darkTheme, setDarkTheme] = useState(undefined);

  const handleToggle = (event) => {
    setDarkTheme(event.target.checked);
  };

  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        // Set value of  darkmode to dark
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
      } else {
        // Set value of  darkmode to light
        document.documentElement.removeAttribute('data-theme');
        window.localStorage.setItem('theme', 'light');
      }
    }
  }, [darkTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode'
    );
    // Set initial darkmode to light
    setDarkTheme(initialColorValue === 'dark');
  }, []);

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
                                    <Link href="/" locale="ja">
                                        <a>日本語</a>
                                    </Link>
                                    <Link href="/" locale="en">
                                        <a>English</a>
                                    </Link>
                                    <Link href="/" locale="zh">
                                        <a>繁體中文</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles['button-wrapper']}>
                            <label className={styles.switch}>
                                <input type="checkbox" checked={darkTheme} onChange={handleToggle}/>
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