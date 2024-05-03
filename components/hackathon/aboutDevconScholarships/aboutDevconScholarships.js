import styles from "./aboutDevconScholarships.module.scss";
import Button from "../../common/button/button";
import { HACKATHON_APPLICATION_FORM_URL } from "../../../constants";

const AboutDevconScholarships = () => (
  <div id="about" className={styles.about}>
    <div className="container">
      <div className={styles.content}>
        <div>
          <p className={styles.sectionTitle}>About the Devcon Scholarship</p>
          <p className={styles.sectionText}>
            Road to Devcon leads through Belgrade. In addition to monetary prize and bounties, ETH Belgrade Hackathon winners will get scholarships to attend Devcon 7 in Bangkok, Thailand. The scholarship includes:
          </p>
          <ul style={{marginBottom: 50}}>
            <li style={{marginBottom: 7}}>Tickets for <a style={{color: "var(--primary-emerald)"}} href="https://devcon.org/" target="_blank" rel="noreferrer noopener">Devcon</a></li>
            <li style={{marginBottom: 7}}>Free accommodation in Bangkok</li>
            <li style={{marginBottom: 7}}>$500 per team member for the airplane tickets</li>
          </ul>

          <a href={HACKATHON_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button className={styles.button}>
              Apply to hack
            </Button>
          </a>
        </div>
      </div>
      {/*<div className={styles.deadlineContainer}>*/}
      {/*  <p className={styles.deadline}>Registration will close on May 20, 2024</p>*/}
      {/*</div>*/}
    </div>
  </div>
);

export default AboutDevconScholarships;