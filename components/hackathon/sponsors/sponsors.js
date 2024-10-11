import styles from "./sponsors.module.scss";
import Button from "../../common/button/button";
const Sponsors = () => (
  <div className={styles.wrapper}>
    <div className="container">
      <div>
        <p className={styles.title}>Hackathon Sponsors</p>
        <div className={styles.sponsorList}>
          <div className={styles.sponsor}>
            <a href="https://esp.ethereum.foundation/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/EF-ESP-logo.svg" alt="EF ESP logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://chain.link/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/chainlink-logo.svg" alt="Chainlink logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://www.optimism.io/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/optimism.svg" alt="Optimism logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://neonevm.org/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/neon-evm.png" alt="Neon EVM logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://ledger.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/ledger-logo.svg" alt="Ledger logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://linea.build/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/linea-logo.svg" alt="Linea logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://metamask.io/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/metamask-logo.svg" alt="MetaMask logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://www.bnbchain.org/en" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/bnb-chain-logo.svg" alt="BNB Chain logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://ton.org/en" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/ton_logo.svg" alt="TON logo" />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://www.mantle.xyz/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/mantle-logo.svg" alt="Mantle logo" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.cta}>
        {/*<a href="mailto:partnerships@ethbelgrade.rs">*/}
        {/*  <Button className={styles.button}>Sponsor the hackathon</Button>*/}
        {/*</a>*/}
      </div>
    </div>
  </div>
);

export default Sponsors;