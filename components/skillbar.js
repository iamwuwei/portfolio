import { useEffect, useRef } from 'react'
import styles from '../styles/skillbar.module.scss'
const SkillBar = ({ title, percentage }) => {
    const progressRef = useRef()

    useEffect(()=>{

    }, [])
    return (
        <div className={styles.skillbar}>
            <div className={styles.title}>
                <h1>{title}</h1>
                <h1>{percentage}%</h1>
            </div>
            <div className={styles.bar}>
                <div style={{width: `${percentage}%`}} className="animation" ref={progressRef}></div>
            </div>
        </div>
    )
}

export default SkillBar