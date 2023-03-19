import styles from "./sponsors.module.scss";
import Button from "../../common/button/button";
const Sponsors = () => (
  <div className={styles.wrapper}>
    <div className="container">
      <div>
        <p className={styles.title}>Sponsors</p>
        <p className={styles.tba}>TBA</p>
      </div>
      <div className={styles.cta}>
        <Button className={styles.button}>Sponsor the hackathon</Button>
      </div>
    </div>
  </div>
);

export default Sponsors;