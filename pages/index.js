import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/navbar'
import Main from '../components/main'
import Footer from '../components/footer'

import styles from '../styles/Home.module.css'

import upArrow from '../public/up-arrow.png'

export default function Home({data}) {
  return (
    <>
      <Head>
        <title>Home App</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <Main content={data}/>
      </div>
      <Footer />
      {/* <a href="#top" className={styles.upArrow}>
        <Image src={upArrow} />
      </a> */}
    </>
  )
}

// This gets called on every request
export async function getServerSideProps({ locale }) {
  // Fetch data from external API
  const res = await fetch(`${process.env.API_PATH}/home/${locale}`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
