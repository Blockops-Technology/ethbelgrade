import styles from "./about.module.scss";
import Button from "../../common/button/button";
import { Marquee } from "dynamic-marquee-react";

const About = () => (
  <>
    <Marquee rate={-70} startOnScreen>
      <p className={styles.stats}>
        <span className={styles.purple}>3 days</span>
        <span className={styles.blue}>100+ speakers</span>
        <span className={styles.pink}>1200+ Attendees</span>
        <span className={styles.emerald}>250+ hackers</span>
        <span className={styles.green}>40+ web3 companies</span>
        <span className={styles.orange}>30+ investors</span>
      </p>
    </Marquee>

    <div id="about" className={styles.about}>
      <p className={styles.subtitle}>Our manifesto</p>
      <p className={styles.title}>
        <span className={styles.highlight}>&quot;Belgrade,</span> in fact is not a city <span className={styles.highlight}>– it’s a metaphor,</span> a way of life, a way of thinking<span className={styles.highlight}>.&quot;</span>
      </p>

      <div className={styles.content}>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>THE MOST WELCOMING CONFERENCE</p>
          <p>For builders. For Web3 enthusiasts. For Ethereum believers. ETH Belgrade extends a warm embrace to all creatives and explorers eager to share knowledge that will ignite the entire ecosystem. Both the conference and hackathon are crafted to connect like-minded people, providing opportunities for their wildest ideas to come to life. Let&apos;s build together!</p>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Why Belgrade?</p>
          <p>The past and future have been flirting in Belgrade for centuries. Located where the Danube hugs Sava and the East clashes with the West, the city blends different cultures to create eclectic charm. Authentic, vibrant, and sometimes chaotic, Belgrade is built upon tradition, cosmopolitan spirit, and booming technologies.</p>
          <p>Belgrade is home to 50+ Web3 companies creating a fruitful and fast-expanding local community. Many OGs, buidlers, and heavyweights like <strong>Polygon</strong>, <strong>Tenderly</strong>, and <strong>DeFi Saver</strong>, were born and raised in the city. But — one thing is for sure — they are not the last Web3 Belgraders you’ll hear about.</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <a href="https://belgradeblockchainweek.com/discover-belgrade" target="_blank" rel="noreferrer noopener">
          <Button className={styles.button} styleType="blue">
            Discover Belgrade
            <img src="/icons/arrow-right.svg" alt="Arrow right direction icon" />
          </Button>
        </a>
      </div>
    </div>
  </>
);

export default About;