import { useState, useRef, useEffect } from 'react';
import styles from '../styles/contact.module.scss'

const Contact = ({data}) => {
    const messageRef = useRef()
    const contactContainerRef = useRef()
    const [isMessageSection, setMessageSection] = useState(false)
    const [isContactSection, setContactSection] = useState(false)
    const [isInputing, setInputing] = useState(false)
    const [isSentSuccessed, setSentSuccessed] = useState(false)
    const [isSentFailed, setSentFailed] = useState(false)
    const [form, setForm] = useState({ "name": "", "email": "", "message": "" })
    const [loading, setLoading] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSentSuccessed(false)
        setSentFailed(false)
        setLoading(true);
        if (!validateInput()) {
            await setTimeout(() => {
                alert(alertMsg)
                setLoading(false)
                setAlertMsg("")
            }, 1000)
            return
        }
        if (validateEmail(form.email)) {
            await fetch('/api/submitContact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            }).then((result) => {
                if (result.status != 200) {
                    result.json().then(data => { console.log(data.message) })
                    setSentFailed(true)
                }
                else
                    setSentSuccessed(true)

            }).catch((err) => {
                console.log(err)
            })

            await setTimeout(() => { setLoading(false) }, 2000)
        }
        else {
            await setTimeout(() => {
                alert("Invalid email address.")
                setLoading(false)
            }, 1000)
        }
    }
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const hadleInputing = (e) =>{
        if(!isInputing)
            setInputing(true)
    }
    const validateEmail = (emailId) => {
        var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (emailId.match(mailformat)) {
            return true;
        }
        else {
            return false;
        }
    }
    const validateInput = () => {
        if (form.name.length <= 0) {
            setAlertMsg(alertMsg += "please input your name.\n")
        }
        if (form.email.length <= 0) {
            setAlertMsg(alertMsg += "please input your email.\n")
        }
        if (form.message.length <= 0) {
            setAlertMsg(alertMsg += "please input message.\n")
        }
        if (alertMsg !== "")
            return false
        return true
    }

    useEffect(() => {
        var observer = new IntersectionObserver(([entry]) => setMessageSection(entry.isIntersecting))
        observer.observe(messageRef.current)

        var observer2 = new IntersectionObserver(([entry]) => setContactSection(entry.isIntersecting))
        observer2.observe(contactContainerRef.current)
        // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect()
            observer2.disconnect()
        }
    }, [])

    useEffect(() => {
       if(!isMessageSection){
           setInputing(false)
           setSentFailed(false)
           setSentSuccessed(false)
       }
    }, [isMessageSection])
    return (
        <div className={styles.contactContainer} ref={contactContainerRef}>
            <form onSubmit={handleSubmit}>
                <div className={styles.contact} >
                    <h3>Your Name</h3>
                    <input type="text" placeholder="Name" name="name" value={form.name} onChange={handleFormChange} onClick={hadleInputing}>
                    </input>
                    <h3>Email</h3>
                    <input type="text" placeholder='Email' name="email" value={form.email} onChange={handleFormChange} onClick={hadleInputing}>
                    </input>
                    <h3>Message</h3>
                    <textarea placeholder='Message' name="message" value={form.message} onChange={handleFormChange} ref={messageRef} onClick={hadleInputing}>
                    </textarea>
                    <div className={styles.submitContainer}>
                        <input type="submit" disabled={loading} className={`${styles.submitBtn} ${loading ? styles.loading : ''}`} value="Send Message"></input>

                        <svg className={styles.spinner} viewBox="0 0 50 50" style={{ display: `${loading ? 'block' : 'none'}` }} >
                            <circle className={styles.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                        </svg>
                    </div>
                </div>
            </form>

            <div className={styles.hello} style={{ display: `${isContactSection? 'flex' : 'none'}` }}>
                <div className={`${styles.message} ${styles.messageReceiver}`} style={{ display: `${(isContactSection&& !isInputing) ? 'flex' : 'none'}` }}>
                    <div className={styles.messageBody}>{data.wellcomeMsg}</div>
                </div>

                <div className={`${styles.message} ${styles.messageReceiver}`} style={{ display: `${(isMessageSection && !isInputing) ? 'flex' : 'none'}` }}>
                    <div className={styles.messageBody}>{data.msg}</div>
                </div>

                <div className={`${styles.message} ${styles.messageReceiver}`} style={{ display: `${(isSentSuccessed) ? 'flex' : 'none'}` }}>
                    <div className={styles.messageBody}>{data.msgSuccessed}</div>
                </div>

                <div className={`${styles.message} ${styles.messageReceiver}`} style={{ display: `${(isSentFailed) ? 'flex' : 'none'}` }}>
                    <div className={styles.messageBody}>{data.msgError}</div>
                </div>
            </div>
        </div>
    )
}

export default Contact