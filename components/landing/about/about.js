import styles from "./about.module.scss";
import Button from "../../common/button/button";

const About = () => (
  <div id="about" className={styles.about}>
    <div className={styles.numbersWrapper}>
      <img className={styles.numbers} src="/images/stats.png" alt="ETH belrgade numbers" />
      <img className={styles.numbersMobile} src="/images/stats-mobile.png" alt="ETH belrgade numbers" />
    </div>
    <div className="container">
      <p className={styles.subtitle}>Our manifesto</p>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>
          <div><span className={styles.highlight}>&quot;Belgrade,</span> in fact is not a city <span className={styles.highlight}>– it’s a metaphor,</span></div>
          <div>a way of life, a way of thinking<span className={styles.highlight}>.&quot;</span></div>
        </p>
      </div>
    </div>
    <div className={styles.contentWrapper}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.belgradeCalling}>
            <p className={styles.sectionTitle}>ETH Belgrade CALLING</p>
            <p className={styles.sectionText}>ETH Belgrade is a playground for exploring Ethereum possibilities. As part of Belgrade Blockchain Week, this three-day conference gathers extraordinary minds and Ethereum enthusiasts to share knowledge and spark ideas that will ignite the whole ecosystem. And what’s best, as soon as the conference ends, the “after party” begins - the ETH Belgrade Hackathon, which will gather brilliant minds in three days of non-stop action.</p>
          </div>
          <div>
            <div className={styles.whyBelgrade}>
              <p className={styles.sectionTitle}>Why Belgrade?</p>
              <p className={styles.sectionText}>The past and future have been flirting in Belgrade for centuries. Located where the Danube hugs Sava and the East clashes with the West, the city blends different cultures to create eclectic charm. Authentic, vibrant, and sometimes chaotic, Belgrade is built upon tradition, cosmopolitan spirit, and booming technologies.</p>
              <p className={styles.sectionText}>Belgrade is home to 50+ Web3 companies creating a fruitful and fast-expanding local community. Many OGs, buidlers, and heavyweights like <strong>Polygon</strong>, <strong>Tenderly</strong>, and <strong>DeFi Saver</strong>, were born and raised in the city. But — one thing is for sure — they are not the last Web3 Belgraders you’ll hear about.</p>
            </div>
            <a href="https://belgradeblockchainweek.com/discover-belgrade" target="_blank" rel="noreferrer noopener">
                <Button className={styles.button}>Discover belgrade</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;