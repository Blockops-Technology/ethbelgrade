import styles from "./hackathon.module.scss";
import Button from "../../common/button/button";

const Hackathon = () => (
  <div id="hackathon" className={styles.hackathon}>
    <div className="container">
      <div className={styles.content}>
        <img className={styles.image} src="/images/hackathon-label.png" alt="ETH Belgrade Hackathon label"/>
        <div className={styles.data}>
          <p className={styles.date}>5-6 June, 2023</p>
          <a href="https://taikai.network/ethbelgrade/hackathons/hackathon-2023" target="_blank" rel="noreferrer noopener">
            <Button ghost>Apply to hack</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Hackathon;