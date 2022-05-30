import Link from 'next/link'
import styles from '../styles/main.module.scss'
import SkillBar from './skillbar'
import Snorlax from './snorlax'
import Work from './work'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Main = () => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Snorlax />
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
                        love to solve real-life problems with code.
                    </article>
                </section>
                <section>
                    <h1>
                        Works
                    </h1>
                    <article className={styles.works}>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            slidesPerView={1}
                            navigation
                            autoplay={{ delay: 5000 }}
                            pagination={{ clickable: true }}
                        >
                            <SwiperSlide>
                                <Work title={`react project`}/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Work title={`react project`}/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Work title={`react project`}/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Work title={`react project`}/>
                            </SwiperSlide>
                        </Swiper>
                    </article>
                    {/* <div className={`${styles.buttonRow} ${styles.portfolio}`}>
                        <Link href="#">
                            <a className={styles.btn}>{`Mores ->`}</a>
                        </Link>
                    </div> */}
                </section>
                <section>
                    <h1>
                        Skills
                    </h1>
                    <article>
                        <SkillBar title={'HTML/CSS'} percentage={90} />
                        <SkillBar title={'HTML/CSS'} percentage={40} />
                        <SkillBar title={'HTML/CSS'} percentage={40} />
                        <SkillBar title={'HTML/CSS'} percentage={40} />
                        <SkillBar title={'HTML/CSS'} percentage={40} />
                        <SkillBar title={'HTML/CSS'} percentage={40} />
                    </article>
                    <div className={`${styles.buttonRow} ${styles.resume}`}>
                        <Link href="#">
                            <a className={styles.btn}>{`Portfolios ->`}</a>
                        </Link>
                        <Link href="#">
                            <a className={styles.btn}>{`Portfolios ->`}</a>
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Main