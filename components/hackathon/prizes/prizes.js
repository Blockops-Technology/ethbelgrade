import styles from "./prizes.module.scss";

const Prizes = () => (
  <div>
    <div className="container">
      <div className={styles.header}>
        <p className={styles.prizeAmount}>€15,000</p>
        <p className={styles.prizeTitle}>Available in prizes</p>
      </div>
    </div>
  </div>
);

export default Prizes;