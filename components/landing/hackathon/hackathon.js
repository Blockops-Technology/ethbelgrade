import styles from "./hackathon.module.scss";
import Button from "../../common/button/button";
import { HACKATHON_APPLICATION_FORM_URL } from "../../../constants";

const Hackathon = () => (
  <div id="hackathon" className={styles.hackathon}>
    <div className="container">
      <div className={styles.content}>
        <img className={styles.image} src="/images/hackathon-label.png" alt="ETH Belgrade Hackathon label"/>
        <div className={styles.data}>
          <p className={styles.date}>31 May - 2 June, 2024</p>
          <a href={HACKATHON_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button ghost>Apply to hack</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Hackathon;