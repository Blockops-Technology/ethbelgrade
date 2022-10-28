import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Belgrade</title>
        <meta name="description" content="The biggest NFT Conference in the CEE region" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <img src="/NFTBelgrade-text-logo.svg" alt="NFT Belgrade conference logotype" />
          <p className={styles.date}>June, 2023</p>
          <div className={styles.buttons}>
            <a className={styles.button} href="" target="_blank" rel="noreferrer noopener">Get whitelisted</a>
            <a className={styles.ghostButton} href="https://t.me/+MIGPL5WcN_w2YWQ8" target="_blank" rel="noreferrer noopener">Join telegram</a>
          </div>
        </div>
      </main>
    </div>
  )
}
