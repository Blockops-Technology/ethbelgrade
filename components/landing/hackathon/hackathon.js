import styles from "./hackathon.module.scss";
import Button from "../../common/button/button";
import { HACKATHON_APPLICATION_FORM_URL } from "../../../constants";

const Hackathon = () => (
  <div id="hackathon" className={styles.hackathon}>
    <div className={styles.heroImage} />
    <div className={styles.pageTitleContainer}>
      <div className={styles.pageTitleWrapper}>
        <p className={styles.pageTitle}>Hackathon</p>
        <p className={styles.subtitle}>31. MAY — 2. JUNE <span>Online and IRL event</span></p>
      </div>
    </div>
    <div className="container">
      <div className={styles.buttonWrapper}>
        <a href={HACKATHON_APPLICATION_FORM_URL}>
          <Button ghost styleType="emerald">Apply to hack</Button>
        </a>
      </div>
    </div>
  </div>
);

export default Hackathon;