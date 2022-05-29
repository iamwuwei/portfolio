import styles from '../styles/skillbar.module.scss'
const SkillBar = ({ title, percentage }) => {

    return (
        <div className={styles.skillbar}>
            <div className={styles.title}>
                <h1>{title}</h1>
                <h1>{percentage}%</h1>
            </div>
            <div className={styles.bar}>
                <div style={{ backgroundColor: 'blue', width: `${percentage}%`}} className="animation"></div>
            </div>
        </div>
    )
}

export default SkillBar