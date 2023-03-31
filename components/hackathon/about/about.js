import styles from "./about.module.scss";
import Button from "../../common/button/button";

const About = () => (
  <div id="about" className={styles.about}>
    <div className="container">
      <div className={styles.deadlineContainer}>
        <p className={styles.deadline}>Registration will close on May 26, 2023</p>
      </div>
    </div>
    <div className={styles.contentWrapper}>
      <div className="container">
        <div className={styles.content}>
          <img src="/images/hackathon/about-ilu.png" alt=""/>
          <div className={styles.aboutContent}>
            <p className={styles.sectionTitle}>About the hackathon</p>
            <p className={styles.sectionText}>
              ETH Belgrade Hackathon is a two-day competition that gathers talents from all around the world. Our mission is to empower engineers to push the limits of new technologies and build innovative real-world use cases on the Ethereum blockchain.
              <br/>
              <br/>
              To find detailed information about ETH Belgrade Hackathon, please visit our official TAIKAI page.
            </p>
            <a href="https://taikai.network/ethbelgrade/hackathons/hackathon-2023" target="_blank" rel="noreferrer noopener">
              <Button className={styles.button}>
                See the guide
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;