import styles from "./hackathon.module.scss";
import Button from "../../common/button/button";
import { HACKATHON_APPLICATION_FORM_URL, HACKATHON_PRIZE_AMOUNT } from "../../../constants";

const Hackathon = () => (
  <div id="hackathon" className={styles.hackathon}>
    <div className={styles.heroImage} />
    <div className={styles.pageTitleContainer}>
      <div className={styles.pageTitleWrapper}>
        <p className={styles.pageTitle}>Hackathon</p>
        <p className={styles.pageSubtitle}>31. MAY — 2. JUNE <span>Online and IRL event</span></p>
      </div>
    </div>
    <div className="container">
      <p className={styles.amount}>${HACKATHON_PRIZE_AMOUNT}</p>
      <p className={styles.amountDescription}>Available in prizes</p>
      <div className={styles.mainGrid}>
        <div>
          <p className={styles.title}>+ Devcon Scholarships</p>
          <p className={styles.listTitle}>ETH Belgrade Hackathon winners will get:</p>
          <ul style={{fontSize: 20}}>
            <li style={{marginBottom: 7}}>Tickets for Devcon</li>
            <li style={{marginBottom: 7}}>Free accommodation in Bangkok</li>
            <li style={{marginBottom: 7}}>$500 per team member for the airplane tickets</li>
          </ul>
        </div>
        <div>
          <a href="https://devcon.org/" target="_blank" rel="noreferrer noopener">
            <img className={styles.image} src="/images/devcon-mono-logo.png" alt="Devcon logo" />
          </a>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        {/*<a href={HACKATHON_APPLICATION_FORM_URL}>*/}
        {/*  <Button ghost styleType="emerald">Apply to hack</Button>*/}
        {/*</a>*/}
      </div>
    </div>
  </div>
);

export default Hackathon;