import styles from "./prizes.module.scss";

const Prizes = () => (
  <div className={styles.prizes}>
    <div className="container">
      <div className={styles.header}>
        <p className={styles.totalAmount}>$22,000</p>
        <p className={styles.prizeTitle}>Available in prizes</p>
      </div>
      <div>
        <div className={styles.topRow}>
          <div className={styles.prize}>
            <img src="/images/partners/EF-ESP-logo.svg" alt="ETH Belgrade logo"/>
            <p className={styles.prizeAmount}>$10,000</p>
          </div>
          <div className={styles.prize}>
            <img src="/logo-aligned.svg" alt="ETH Belgrade logo"/>
            <p className={styles.prizeAmount}>$5,000</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.prize}>
            <img src="/images/partners/renfter-logo.svg" alt="Renfter logo"/>
            <p className={styles.prizeAmount}>$3,000</p>
          </div>
          <div className={styles.prize}>
            <img src="/images/partners/MetaMaskSnaps-logo.svg" alt="MetaMask logo"/>
            <p className={styles.prizeAmount}>$3,000</p>
          </div>
          <div className={styles.prize}>
            <img src="/images/partners/LayerX-logo.svg" alt="Layerx logo"/>
            <p className={styles.prizeAmount}>$1,000</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Prizes;