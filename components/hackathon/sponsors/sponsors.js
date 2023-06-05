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
          {/*<div className={styles.sponsor}>*/}
          {/*  <a href="https://renfter.com/" target="_blank" rel="noreferrer noopener">*/}
          {/*    <img src="/images/partners/renfter-logo.svg" alt="Renfter logo" />*/}
          {/*  </a>*/}
          {/*</div>*/}
          <div className={styles.sponsor}>
            <a href="https://metamask.io/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/MetaMaskSnaps-logo.svg" alt="MetaMask logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://illuminate.finance/" target="_blank" rel="noreferrer noopener">
              <img src="/images/hackathon/illuminate.png" alt="Illuminate logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://attest.sh/" target="_blank" rel="noreferrer noopener">
              <img src="/images/hackathon/EAS.png" alt="EAS logo" />
            </a>
          </div>
          {/*<div className={styles.sponsor}>*/}
          {/*  <a href="https://layerx.xyz/" target="_blank" rel="noreferrer noopener">*/}
          {/*    <img src="/images/partners/LayerX-logo.svg" alt="LayerX logo" />*/}
          {/*  </a>*/}
          {/*</div>*/}
          <div className={styles.sponsor}>
            <a href="https://layerx.xyz/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/LayerX-logo.svg" alt="LayerX logo" />
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