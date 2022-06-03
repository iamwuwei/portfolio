import { useState, useEffect, useRef } from 'react'
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
import Skill from './skill'
import Contact from './contact'

const Main = ({ content }) => {
    const refSlideContainer = useRef()
    const refSkillContainer = useRef()
    const [isSlideContainerVisible, setSlideContainerVisible] = useState(false)
    let observer = null
    useEffect(() => {
        observer = new IntersectionObserver(([entry]) => setSlideContainerVisible(entry.isIntersecting))
        observer.observe(refSlideContainer.current)
        // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Snorlax />
                <div className={styles.profile}>
                    <h1>
                        {`${content.profile.lastName} ${content.profile.firstName}`}
                    </h1>
                    <h2>
                        Software Engineer
                    </h2>
                </div>
                <section>
                    <h1>
                        About Me
                    </h1>
                    <article className={styles.about}>
                        {`${content.about.content}`}
                    </article>
                </section>
                <section>
                    <h1>
                        Works
                    </h1>
                    <article className={styles.works} ref={refSlideContainer}>
                        {isSlideContainerVisible && <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            slidesPerView={1}
                            navigation
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            style={{ borderRadius: `10px` }}
                        >
                            <SwiperSlide>
                                <Work title={`react project`} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Work title={`react project`} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Work title={`react project`} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Work title={`react project`} />
                            </SwiperSlide>
                        </Swiper>
                        }
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
                        <Skill data={content.skill}/>
                    </article>
                    {/* <div className={`${styles.buttonRow} ${styles.resume}`}>
                        <Link href="#">
                            <a className={styles.btn}>{`Download CV ->`}</a>
                        </Link>
                    </div> */}
                <section>
                    <h1>
                        Contact Me
                    </h1>
                    <article>
                       <Contact />
                    </article>
                </section>
            </div>
        </main>
    )
}

export default Main