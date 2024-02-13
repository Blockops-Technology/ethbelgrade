import styles from "./about.module.scss";
import Button from "../../common/button/button";
import { HACKATHON_APPLICATION_FORM_URL } from "../../../constants";

const About = () => (
  <div id="about" className={styles.about}>
    <div className="container">
     <div className={styles.deadlineContainer}>
       <p className={styles.deadline}>Registration will close on May 20, 2024</p>
     </div>
    </div>
    <div className={styles.contentWrapper}>
      <div className="container">
        <div className={styles.content}>
          <img src="/images/hackathon/about-ilu.png" alt=""/>
          <div className={styles.aboutContent}>
            <p className={styles.sectionTitle}>About the hackathon</p>
            <p className={styles.sectionText}>
              ETH Belgrade Hackathon offers a three-day hacking experience with a primary focus on building on Ethereum. Following the success of the inaugural hackathon in 2023, we aim to surpass it in every aspect.
              <br />
              <br />
              This year, we're opening the doors for builders from all around the globe to join us both in-person and online (hybrid). Our goal is to gather hundreds of hackers and curious minds to develop projects and use cases that will reshape the Ethereum landscape and enhance people's lives.
              <br />
              <br />
              An attractive prize pool, numerous bounties, collaborations with people from top-tier protocols and an unparalleled opportunity to bring your fresh ideas to life—these are just some of the benefits you'll gain by participating in the second edition of the ETH Belgrade conference.
            </p>
            <p className={styles.sectionText}>To find detailed information about ETH Belgrade Hackathon, please visit our official TAIKAI page.</p>
            
            <a href={HACKATHON_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
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