import styles from "./sponsors.module.scss";
import Button from "../../common/button/button";
const Sponsors = () => (
  <div className={styles.wrapper}>
    <div className="container">
      <div>
        <p className={styles.title}>ETH Belgrade Community Sponsors</p>
        <div className={styles.sponsorList}>
          <div className={styles.sponsor}>
            <a href="https://esp.ethereum.foundation/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/EF-ESP-logo.svg" alt="EF ESP logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://tenderly.co/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/tenderly.svg" alt="Tenderly logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://defisaver.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/defi-saver.png" alt="DeFi Saver logo" />
            </a>
          </div>
        </div>
      </div>
      {/*<div className={styles.cta}>*/}
      {/*  <a href="mailto:partnerships@ethbelgrade.rs">*/}
      {/*    <Button className={styles.button}>Sponsor the hackathon</Button>*/}
      {/*  </a>*/}
      {/*</div>*/}
    </div>
  </div>
);

export default Sponsors;