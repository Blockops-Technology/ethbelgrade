import styles from "./about.module.scss";
import Button from "../../common/button/button";

const About = () => (
  <div id="about" className={styles.about}>
    <div>
      <div className="container">
        <div className={styles.pillarsImage}>
          <img src="/images/community/three-pillars.svg" alt="Three pillars of ETH Belgrade"/>
        </div>
        <div className={styles.content}>
          <div className={styles.aboutContent}>
            <p className={styles.sectionTitle}>What is ETH Belgrade Community?</p>
            <p>
              ETH Belgrade Community is a natural extension of the ETH Belgrade conference, which the first edition successfully happened in June 2023.
              <br />
              <br />
              By organizing various high-quality events (meetups, build & chill gatherings, etc.) throughout the year we aim to strengthen and nurture the most numbered and cohesive community in this part of Europe and become a bridge to other influential communities worldwide.
              <br />
              <br />
              We strive to spread the ethos and ideas of Ethereum and the Web3 movement and to educate and onboard all curious talents.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;