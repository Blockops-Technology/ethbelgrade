import styles from "./mediaPartners.module.scss";
import Button from "../../common/button/button";

const MediaPartners = () => (
  <div className={styles.mediaPartners}>
    <div className="container">
      <div className={styles.header}>
        <p className={styles.title}>Thanks for spreading the word</p>
        <a href="mailto:tanja@ethbelgrade.rs">
          <Button>Become a media partner</Button>
        </a>
      </div>
      <div className={styles.mediaPartnersList}>
        <a href="https://startit.rs/" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/startit_logo_beli.svg" alt="Startit logo" />
        </a>
        <a href="http://itindustrija.com/" target="_blank" rel="noreferrer noopener">
          <img src="/images/media-partners/IT_Industrija_logo_beli.svg" alt="Startit logo" />
        </a>
      </div>
    </div>
  </div>
);

export default MediaPartners;