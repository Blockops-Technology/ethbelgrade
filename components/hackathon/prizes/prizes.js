import styles from "./prizes.module.scss";
import { HACKATHON_PRIZE_AMOUNT } from "../../../constants";

const Prizes = () => (
  <div className={styles.prizes}>
    <div className="container">
      <div className={styles.header}>
        <p className={styles.totalAmount}>${HACKATHON_PRIZE_AMOUNT}</p>
        <p className={styles.prizeTitle}>Available in prizes</p>
        <p className={styles.plus}>+</p>
        <img className={styles.devconLogo} src="/images/hackathon/devcon-logo.png" alt="Devcon logo" />
        <p className={styles.prizeTitle}>Scholarships</p>
      </div>
      {/*<div>*/}
      {/*  <div className={styles.topRow}>*/}
      {/*    <div className={styles.prize}>*/}
      {/*      <img src="/images/hackathon/eth-general-track.png" alt="ETH Belgrade logo"/>*/}
      {/*      <p className={styles.prizeAmount}>$10,000</p>*/}
      {/*    </div>*/}
      {/*    <div className={styles.prize}>*/}
      {/*      <img src="/images/partners/MetaMaskSnaps-logo.svg" alt="MetaMask logo"/>*/}
      {/*      <p className={styles.prizeAmount}>$3,000</p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={styles.row}>*/}
      {/*    <div className={styles.prize}>*/}
      {/*      <img src="/images/hackathon/illuminate.png" alt="Illuminate logo"/>*/}
      {/*      <p className={styles.prizeAmount}>$3,000</p>*/}
      {/*    </div>*/}
      {/*    <div className={styles.prize}>*/}
      {/*      <img src="/images/hackathon/EAS.png" alt="EAS logo"/>*/}
      {/*      <p className={styles.prizeAmount}>$3,000</p>*/}
      {/*    </div>*/}
      {/*    <div className={styles.prize}>*/}
      {/*      <img src="/logo-aligned.svg" alt="ETH Belgrade logo"/>*/}
      {/*      <p className={styles.prizeAmount}>$1,000</p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={styles.row}>*/}
      {/*    <div className={styles.prize}>*/}
      {/*      <img src="/images/partners/polygon-logo.svg" alt="Polygon logo"/>*/}
      {/*      <p className={styles.prizeAmount}>$1,000</p>*/}
      {/*    </div>*/}
      {/*    <div className={styles.prize}>*/}
      {/*      <img src="/images/partners/LayerX-logo.svg" alt="Layerx logo"/>*/}
      {/*      <p className={styles.prizeAmount}>$1,000</p>*/}
      {/*    </div>*/}
      {/*    <div className={styles.prize}>*/}
      {/*      /!*<img src="/images/partners/LayerX-logo.svg" alt="Layerx logo"/>*!/*/}
      {/*      /!*<p className={styles.prizeAmount}>$1,000</p>*!/*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  </div>
);

export default Prizes;