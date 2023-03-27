import styles from "./prizes.module.scss";

const Prizes = () => (
  <div className={styles.prizes}>
    <div className="container">
      <div className={styles.header}>
        <p className={styles.totalAmount}>$21,000</p>
        <p className={styles.prizeTitle}>Available in prizes</p>
      </div>
      <div>
        <div className={styles.topRow}>
          <div className={styles.prize}>
            <img src="/logo-aligned.svg" alt="ETH Belgrade logo"/>
            <p className={styles.prizeAmount}>$15,000</p>
          </div>
          <div className={styles.prize}>
            <img src="/images/partners/renfter-logo.svg" alt="Renfter logo"/>
            <p className={styles.prizeAmount}>$5,000</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.prize}>
            <img src="/images/partners/taikai.svg" alt="TAIKAI logo"/>
            <p className={styles.prizeAmount}>$1,000</p>
          </div>
          <div className={styles.prize}>
            {/*<img src="/images/partners/renfter-logo.svg" alt="RENFTER logo"/>*/}
            <p className={styles.prizeAmount}>Coming soon</p>
          </div>
          <div className={styles.prize}>
            {/*<img src="/images/partners/renfter-logo.svg" alt="RENFTER logo"/>*/}
            <p className={styles.prizeAmount}>Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Prizes;