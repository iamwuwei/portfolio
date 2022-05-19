import style from '../styles/Navbar.module.css'
import Image from 'next/image'
import darkModeMoonSvg from '../public/dark-mode-moon.svg'

const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <div className={style['navbar-container']}>
                <div className={style['navbar-element-wrapper']}>
                    <div className={style.name}>
                        <h1>
                            Wu Wei
                        </h1>
                    </div>
                    <div className={style['dark-mode-button-wrapper']}>
                        <button className={style['dark-mode-button']}>
                            <Image src={darkModeMoonSvg} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar