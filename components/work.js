import Image from 'next/image'
import Link from 'next/link'
import Images from '../public/icon/index.js'
import styles from '../styles/work.module.scss'
const Work = ({ title }) => {

    return (
        <div className={styles.workContainer}>
            <div className={styles.work}>
                <div className={styles.pic}>
                    <Image src={Images.react} layout="fill" objectFit="contain" />
                </div>
                <div className={styles.detail}>
                    <h1>{title}</h1>
                    <div className={styles.description}>
                        {`Description`}
                    </div>
                    <div className={`${styles.buttonRow}`}>
                        <Link href="#">
                            <a className={styles.btn}>{`Demo ->`}</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Work