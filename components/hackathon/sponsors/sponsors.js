import styles from "./sponsors.module.scss";
import Button from "../../common/button/button";
const Sponsors = () => (
  <div className={styles.wrapper}>
    <div className="container">
      <div>
        <p className={styles.title}>Sponsors</p>
        <div className={styles.sponsorList}>
          <div className={styles.sponsor}>
            <a href="https://esp.ethereum.foundation/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/EF-ESP-logo.svg" alt="EF ESP logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://renfter.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/renfter-logo.svg" alt="Renfter logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://taikai.network/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/taikai.svg" alt="TAIKAI logo" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.cta}>
        <a href="mailto:partnerships@ethbelgrade.rs">
          <Button className={styles.button}>Sponsor the hackathon</Button>
        </a>
      </div>
    </div>
  </div>
);

export default Sponsors;