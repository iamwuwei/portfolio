import { useState } from 'react';
import styles from '../styles/contact.module.scss'

const Contact = () => {
    const [form, setForm] = useState({ "name": "", "email": "", "message": "" });
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch('/api/submitContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        }).then((result) => {
            if (result.status != 200) {
                result.json().then(data => { console.log(data.message) })
            }

        }).catch((err) => {
            console.log(err)
        })
        await setTimeout(()=>{ setLoading(false) }, 2000);
    }
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <div className={styles.contactContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.contact} >
                    <h3>Your Name</h3>
                    <input type="text" placeholder="Name" name="name" value={form.name} onChange={handleFormChange} >
                    </input>
                    <h3>Email</h3>
                    <input type="text" placeholder='Email' name="email" value={form.email} onChange={handleFormChange}>
                    </input>
                    <h3>Message</h3>
                    <textarea placeholder='Message' name="message" value={form.message} onChange={handleFormChange}>
                    </textarea>
                    <div className={styles.submitContainer}>
                        <input type="submit" disabled={loading} className={`${styles.submitBtn} ${loading ? styles.loading : ''}`} value="Send Message"></input>

                        <svg className={styles.spinner} viewBox="0 0 50 50" style={{ display: `${loading ? 'block' : 'none'}` }} >
                            <circle className={styles.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                        </svg>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Contact