import styles from "./aboutDevconScholarships.module.scss";
import Button from "../../common/button/button";
import { HACKATHON_APPLICATION_FORM_URL } from "../../../constants";

const AboutDevconScholarships = () => (
  <div id="about" className="mb-20">
    <div className="container">
      <div className="mb-5">
        <div>
          <p className={styles.sectionTitle}>About the Devcon Scholarship</p>
          <p className={styles.sectionText}>
            Road to Devconnect leads through Belgrade. In addition to monetary prize and bounties, ETH Belgrade Hackathon winners will get scholarships to attend Devconnect 2025 in wherever it will be held (most likely in Buenos Aires, Argentina). The scholarship includes:
          </p>
          <ul style={{ marginBottom: 50 }}>
            <li style={{ marginBottom: 7 }}>Tickets for various <a style={{ color: "var(--primary-blue)" }} href="https://devconnect.org/" target="_blank" rel="noreferrer noopener">Devconnect</a> events</li>
            <li style={{ marginBottom: 7 }}>Free accommodation</li>
            <li style={{ marginBottom: 7 }}>$500 per team member for the airplane tickets</li>
          </ul>

          <a href={HACKATHON_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button>
              Apply to hack
            </Button>
          </a>
        </div>
      </div>
      <div className="">
        <p className="">Registration will close on June 2, 2025</p>
      </div>
    </div>
  </div >
);

export default AboutDevconScholarships;