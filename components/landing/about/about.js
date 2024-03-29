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
          <span className={styles.indent}>&quot;<span className={styles.underline}>Belgrade</span>, in fact is not a city</span>
          {/*<br />*/}
          <span className={styles.rotate}> – it’s a metaphor, a way of life, a way of thinking.&quot;</span>
          {/*<span className={styles.indent}>Come for conference,</span>*/}
          {/*<br />*/}
          {/*<span className={styles.rotate}>stay for <span className={styles.underline}>Belgrade</span></span>*/}
        </p>
      </div>
    </div>
    <div className={styles.contentWrapper}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.belgradeCalling}>
            <p className={styles.sectionTitle}>THE MOST WELCOMING CONFERENCE</p>
            <p className={styles.sectionText}>For builders. For Web3 enthusiasts. For Ethereum believers. ETH Belgrade extends a warm embrace to all creatives and explorers eager to share knowledge that will ignite the entire ecosystem. Both the conference and hackathon are crafted to connect like-minded people, providing opportunities for their wildest ideas to come to life. Let&amps;s build together!</p>
          </div>
          <div className={styles.whyBelgrade}>
            <p className={styles.sectionTitle}>Why Belgrade?</p>
            <p className={styles.sectionText}>The past and future have been flirting in Belgrade for centuries. Located where the Danube hugs Sava and the East clashes with the West, the city blends different cultures to create eclectic charm. Authentic, vibrant, and sometimes chaotic, Belgrade is built upon tradition, cosmopolitan spirit, and booming technologies.</p>
            <p className={styles.sectionText}>Belgrade is home to 50+ Web3 companies creating a fruitful and fast-expanding local community. Many OGs, buidlers, and heavyweights like <strong>Polygon</strong>, <strong>Tenderly</strong>, and <strong>DeFi Saver</strong>, were born and raised in the city. But — one thing is for sure — they are not the last Web3 Belgraders you’ll hear about.</p>
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