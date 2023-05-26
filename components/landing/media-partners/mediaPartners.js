import styles from "./mediaPartners.module.scss";
import Button from "../../common/button/button";

const MediaPartners = () => (
  <div className={styles.mediaPartners}>
    <div className="container">
      <div className={styles.header}>
        <p className={styles.title}>Thanks for spreading the word</p>
        {/*<a href="mailto:tanja@ethbelgrade.rs">*/}
        {/*  <Button>Become a media partner</Button>*/}
        {/*</a>*/}
      </div>
      <div className={styles.mediaPartnersList}>
        <a href="https://cointelegraph.com/" target="_blank" rel="noreferrer noopener">
          <img className={styles.cointelegraph} src="/images/media-partners/cointelegraph-logo.png" alt="Cointelegraph logo" />
        </a>
        <a href="https://beincrypto.com" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/beincrypto-logo.svg" alt="Be in Crypto logo" />
        </a>
        <a href="https://coinedition.com/" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/Coin-Edition.png" alt="Coin Edition logo" />
        </a>
        <a href="https://startit.rs/" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/startit_logo_beli.svg" alt="Startit logo" />
        </a>
        <a href="http://itindustrija.com/" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/IT_Industrija_logo_beli.svg" alt="Startit logo" />
        </a>
        <a href="https://www.netokracija.rs/" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/netokracija-logo.svg" alt="Netokracija logo" />
        </a>
        <a href="https://cryptodataspace.com/" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/CDS_LOGO_WHITE.svg" alt="Crypto Data Space logo" />
        </a>
        <a href="https://itez.com/events" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/itez-logo.png" alt="Itez logo" />
        </a>
        <a href="https://cryptorank.io/" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/cryptorank-logo.svg" alt="Cryptorank logo" />
        </a>
        <a href="https://aiovel.com/" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/AIOVEL_logo.png" alt="AIOVEL logo" />
        </a>
        <a href="https://web-mind.io/" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/WEBMIND-logo.png" alt="Webmind logo" />
        </a>
      </div>
    </div>
  </div>
);

export default MediaPartners;