import styles from '../styles/main.module.scss'
import SkillBar from './skillbar'

const Main = () => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.profile}>

                    <h1>
                        Wu Wei
                    </h1>
                    <h2>
                        Software Engineer
                    </h2>
                </div>
                <section>
                    <h1>
                        About Me
                    </h1>
                    <article>
                        I'm a full-stack software engineer based in Japan, Tokyo now. <br />
                        love to planning and designing all the way to solving real-life problems with code. 
                    </article>
                </section>
                <section>
                    <h1>
                       Works
                    </h1>

                </section>
                <section>
                    <h1>
                       Skills
                    </h1>
                    <article>
                        <SkillBar title={'HTML/CSS'} percentage={90}/>
                        <SkillBar title={'HTML/CSS'} percentage={40}/>
                    </article>
                </section>
            </div>
        </main>
    )
}

export default Main