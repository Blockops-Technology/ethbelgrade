import styles from "./mediaPartners.module.scss";
import Button from "../../common/button/button";

const MediaPartners = () => (
  <div>
    <div className={styles.pageTitleContainer}>
      <p className={styles.pageTitle}>Media Partners</p>
      <p className={styles.subtitle}>Thanks for spreading the word</p>
    </div>
    <div className={styles.mediaPartnersListWrapper}>
      <div className="container">
        <div className={styles.mediaPartnersList}>
          {/*<a href="https://cointelegraph.com/" target="_blank" rel="noreferrer noopener">*/}
          {/*  <img className={styles.cointelegraph} src="/images/media-partners/cointelegraph-logo.png" alt="Cointelegraph logo" />*/}
          {/*</a>*/}
          <a href="https://beincrypto.com" target="_blank" rel="noreferrer noopener">
            <img src="/images/media-partners/beincrypto-logo.svg" alt="Be in Crypto logo" />
          </a>
          <a href="https://startit.rs/" target="_blank" rel="noreferrer noopener">
            <img src="/images/media-partners/startit_logo.svg" alt="Startit logo" />
          </a>
          <a href="https://itindustrija.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/media-partners/IT_Industrija_logo_beli.svg" alt="It Industrija logo" />
          </a>
          <a href="https://www.netokracija.rs/" target="_blank" rel="noreferrer noopener">
            <img src="/images/media-partners/netokracija-logo.svg" alt="Netokracija logo" />
          </a>
          <a href="https://listing.help/" target="_blank" rel="noreferrer noopener">
            <img src="/images/media-partners/listing-help.svg" alt="Listing help logo" />
          </a>
          <a href="https://u.today/" target="_blank" rel="noreferrer noopener">
            <img src="/images/media-partners/utoday-logo.svg" alt="u.today logo" />
          </a>
          <a href="https://mpost.io/" target="_blank" rel="noreferrer noopener">
            <img src="/images/media-partners/mpost.png" alt="Metaverse post logo" />
          </a>
          <a href="https://jinse.cn/" target="_blank" rel="noreferrer noopener">
            <img src="/images/media-partners/jinse-cn.png" alt="Jinse logo" />
          </a>
          {/*<a href="https://itez.com/events" target="_blank" rel="noreferrer noopener">*/}
          {/*  <img src="/images/media-partners/itez-logo.png" alt="Itez logo" />*/}
          {/*</a>*/}
        </div>
      </div>
    </div>

    <div className="container">
      <div className={styles.buttonWrapper}>
        <a href="mailto:tanja@ethbelgrade.rs">
          <Button ghost styleType="purple">Become a media partner</Button>
        </a>
      </div>
    </div>

  </div>
);

export default MediaPartners;