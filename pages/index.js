import Head from "next/head";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Belgrade</title>
        <meta name="description" content="The biggest NFT Conference & NFT Gaming Hackathon in the CEE region" />


        <meta property="og:title" content="NFT Belgrade"/>
        <meta property="og:description" content="The biggest NFT Conference & NFT Gaming Hackathon in the CEE region"/>
        <meta property="og:image" content="https://nftbelgrade.com/nft-blegrade-og.jpg"/>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NFT Belgrade" />
        <meta name="twitter:description" content="The biggest NFT Conference & NFT Gaming Hackathon in the CEE region"/>
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@nftbelgrade" />
        <meta name="twitter:image" content="https://nftbelgrade.com/nft-blegrade-og.jpg" />

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
          <div className={styles.socials}>
            <p>Let&apos;s connect:</p>
            <a href="https://twitter.com/nftbelgrade" target="_blank" rel="noreferrer noopener">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
