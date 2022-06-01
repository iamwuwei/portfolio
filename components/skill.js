import { useState, useEffect, useRef  } from 'react'
import Image from 'next/image'
import styles from '../styles/skill.module.scss'

import frontEndPng from '../public/frontend-development.png'
import backEndPng from '../public/backend-development.png'
import appPng from '../public/app-development.png'
import SkillBar from './skillbar'

const Skill = () => {
    const [segment, setSegment] = useState("frontend")
    const fontendSegmentRef = useRef()
    const backendSegmentRef = useRef()
    const appSegmentRef = useRef()
    const controlRef = useRef()

    const handleChange = e => {
        const { name, value } = e.target;

        if (value === 'frontend') {
            setSegment(
                "frontend"
            )
        }
        else if (value === 'backend') {
            setSegment(
                "backend"
            )
        }
        else if (value === 'app') {
            setSegment(
                "app"
            )
        }
    };

    useEffect(() => {
        if (segment === 'frontend') {
            setOffset(fontendSegmentRef)
        }
        else if (segment === 'backend') {
            setOffset(backendSegmentRef)
        }
        else if (segment === 'app') {
            setOffset(appSegmentRef)
        }
    }, [segment])

    const setOffset = (activeSegmentRef) =>{
        const { offsetHeight, offsetTop } = activeSegmentRef.current;
        const { style } = controlRef.current;
    
        style.setProperty("--highlight-height", `${offsetHeight-5}px`);
        style.setProperty("--highlight-y-pos", `${offsetTop}px`);
    }
    return (
        <div className={styles.skillContainer}>
            <div className={styles.skill}>
                <div className={styles.navigationContainer}>
                    <div className={styles.navigation} ref={controlRef}>
                        <label className={styles.segment} ref={fontendSegmentRef}>
                            <input type="radio" name="skill-type" value="frontend" id="first" onChange={handleChange} checked={segment === 'frontend'} />
                            <div className={styles.wrapper}>
                                <div className={styles.img}>
                                    <Image src={frontEndPng} />
                                </div>
                                {/* <h3>Front End Development</h3> */}
                            </div>
                        </label>
                        <label className={styles.segment} ref={backendSegmentRef}>
                            <input type="radio" name="skill-type" value="backend" id="second" onChange={handleChange} checked={segment === 'backend'} />
                            <div className={styles.wrapper}>

                                <div className={styles.img}>
                                    <Image src={backEndPng} />
                                </div>
                                {/* <h3>Back End Development</h3> */}
                            </div>
                        </label>
                        <label className={styles.segment} ref={appSegmentRef}>
                            <input type="radio" name="skill-type" value="app" id="third" onChange={handleChange} checked={segment === 'app'} />
                            <div className={styles.wrapper}>
                                <div className={styles.img}>
                                    <Image src={appPng} />
                                </div>
                                {/* <h3>App Development</h3> */}
                            </div>
                        </label>
                    </div>
                </div>
                <div className={styles.skillbars}>
                    <SkillBar title={'HTML/CSS'} percentage={40} />
                    <SkillBar title={'HTML/CSS'} percentage={40} />
                </div>
            </div>
        </div>
    )
}

export default Skill