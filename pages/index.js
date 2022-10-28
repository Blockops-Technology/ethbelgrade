import Head from "next/head";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Belgrade</title>
        <meta name="description" content="The biggest NFT Conference in the CEE region" />


        <meta property="og:title" content="NFT Belgrade"/>
        <meta property="og:description" content="The biggest NFT Conference in the CEE region"/>
        <meta property="og:image" content="https://nftbelgrade.com/nft-blegrade-og.jpg"/>

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nftbelgrade" />
        <meta property="og:image" content="/nft-blegrade-og.jpg"/>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <img src="/NFTBelgrade-text-logo.svg" alt="NFT Belgrade conference logotype" />
          <p className={styles.date}>June, 2023</p>
          <div className={styles.buttons}>
            <a className={styles.button} href="https://xntkpyvzukn.typeform.com/to/ohkYPQyW" target="_blank" rel="noreferrer noopener">Get whitelisted</a>
            <a className={styles.ghostButton} href="https://t.me/+MIGPL5WcN_w2YWQ8" target="_blank" rel="noreferrer noopener">Join telegram</a>
          </div>
        </div>
      </main>
    </div>
  )
}
