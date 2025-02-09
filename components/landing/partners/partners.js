import styles from "./partners.module.scss";
import Button from "../../common/button/button";
import { SPONSOR_APPLICATION_FORM_URL, YEAR } from "../../../constants";
import Tier from "./tier";


const Partners = ({ partners }) => (
  <div id="partners">
    <div className={styles.pageTitleContainer}>
      <p className={styles.pageTitle}>Sponsors</p>
    </div>
    <div className="container">
      <p className={styles.title}>They’ve helped us BIG TIME!</p>
      <p className={styles.subtitle}>Shout out to key industry players for supporting ETH Belgrade {YEAR}!</p>

      <div>
        <Tier name="Supersponsors" className={styles.superSponsorsList} partners={partners.supersponsors} />
        <Tier name="Tier 2 sponsors" partners={partners.tier_2_sponsors} />
        <Tier name="Tier 3 sponsors" partners={partners.tier_3_sponsors} />
        <Tier name="Tier 4 sponsors" partners={partners.tier_4_sponsors} />
        <Tier name="Coffee sponsor" partners={partners.coffee_sponsors} />
        <Tier name="Supported by" partners={partners.supported_by} />
        <Tier name="Partners" partners={partners.partners} />
      </div>

      <div className={styles.ctaSection}>
        <p className={styles.ctaTitle}><span>Consider</span> becoming a sponsor?</p>
        <div className={styles.buttonWrapper}>
          <a href={SPONSOR_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button className={styles.button} styleType="yellow">Get in touch</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Partners;