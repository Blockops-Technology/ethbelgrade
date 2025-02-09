import Button from "../../common/button/button";
import Partner from "../../common/partner/partner";
import styles from "./mediaPartners.module.scss";

const MediaPartners = ({ media }) => (
  <div>
    <div className={styles.pageTitleContainer}>
      <p className={styles.pageTitle}>Media Partners</p>
      <p className={styles.subtitle}>Thanks for spreading the word</p>
    </div>
    <div className={styles.mediaPartnersListWrapper}>
      <div className="container">
        <div className={styles.mediaPartnersList}>
          {
            media.map((partner, i) => (
              <Partner key={i} url={partner.meta.en.url} logo={partner.meta.en.logo} />
            ))
          }
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
