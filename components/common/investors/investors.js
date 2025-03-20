import styles from "./investors.module.scss";

const Investors = () => {
  return (<div className={styles.investorsGrid}>
    <a style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "center" }} href="https://www.johnlilic.info/" target="_blank" rel="noreferrer noopener">
      <img src="/images/partners/johnlilic.jpg" alt="John Lilic logo" />
      <p style={{ fontWeight: "bold", fontSize: 20, textTransform: "uppercase" }}>John Lilic</p>
    </a>
    <a href="https://www.daedalus.gg/" target="_blank" rel="noreferrer noopener">
      <img src="/images/ventures/daedalus.png" alt="" />
    </a>
    <a href="https://www.bigbrain.holdings/" target="_blank" rel="noreferrer noopener">
      <img src="/images/ventures/bbh-logo.svg" alt="" />
    </a>
    <a href="https://www.veryearly.xyz/" target="_blank" rel="noreferrer noopener">
      <img src="/images/ventures/veryearly.svg" alt="" />
    </a>
    <a href="https://www.cherry.xyz/" target="_blank" rel="noreferrer noopener">
      <img src="/images/ventures/cherry-logo.svg" alt="Cherry Crypto logo" />
    </a>
    <a href="https://www.yay.network/" target="_blank" rel="noreferrer noopener">
      <img src="/images/ventures/yay-network-logo.svg" alt="Yay.network logo" />
    </a>
    <a href="https://polymorphic.capital/" target="_blank" rel="noreferrer noopener">
      <img src="/images/ventures/polymorphic-capital.svg" alt="Polymorphic Capital logo" />
    </a>
    <a href="https://mostcapital.ch/" target="_blank" rel="noreferrer noopener">
      <img style={{ maxHeight: 80 }} src="/images/ventures/most-capital.png" alt="Most Capital logo" />
    </a>
  </div>);
};

export default Investors;
