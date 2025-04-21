import styles from "./hackathon.module.scss";
import Button from "../../common/button/button";
import { HACKATHON_APPLICATION_FORM_URL, HACKATHON_DATE, HACKATHON_PRIZE_AMOUNT } from "../../../constants";

const Hackathon = () => (
  <div id="hackathon" className={styles.hackathon}>
    <div className={styles.heroImage} />
    <div className={styles.pageTitleContainer}>
      <div className={styles.pageTitleWrapper}>
        <p className={styles.pageTitle}>Hackathon</p>
        <p className={styles.pageSubtitle}>{HACKATHON_DATE.toUpperCase()} <span>The first ever decentralized hackathon. Online and IRL</span></p>
      </div>
    </div>
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-15 mt-20">
        <div>
          <p className={`${styles.amount} !text-[80px] md:!text-[120px] leading-none mb-5`}>${HACKATHON_PRIZE_AMOUNT}</p>
          <p className="text-2xl text-center">Available in prizes</p>
        </div>
        {/* <div>
          <p className={styles.title} >+</p>
        </div>

        <div>
          <img className={styles.image} src="/images/devconnect-logo.svg" alt="Devconnect logo" />
          <p className={styles.title}>Devconnect Scholarships</p>
          <ul style={{ fontSize: 20 }}>
            <li style={{ marginBottom: 7 }}>Tickets for various events at Devconnect</li>
            <li style={{ marginBottom: 7 }}>Free accommodation</li>
            <li style={{ marginBottom: 7 }}>$500 per team member for the airplane tickets</li>
          </ul>
        </div> */}
      </div>
      <div className="flex justify-center mt-10 mb-20">
        <a target="_blank" rel="noreferrer noopener" href={HACKATHON_APPLICATION_FORM_URL}>
          <Button ghost styleType="emerald">Apply to hack</Button>
        </a>
      </div>
    </div>
  </div >
);

export default Hackathon;