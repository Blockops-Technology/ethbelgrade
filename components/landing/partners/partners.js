import { bcms } from "../../../bcms";
import { BCMSImage } from "@thebcms/components-react";
import styles from "./partners.module.scss";
import Button from "../../common/button/button";
import { SPONSOR_APPLICATION_FORM_URL, YEAR } from "../../../constants";
import Partner from "./partner";


const Partners = ({ partners }) => (
  <div id="partners">
    <div className={styles.pageTitleContainer}>
      <p className={styles.pageTitle}>Sponsors</p>
    </div>
    <div className="container">
      <p className={styles.title}>They’ve helped us BIG TIME!</p>
      <p className={styles.subtitle}>Shout out to key industry players for supporting ETH Belgrade {YEAR}!</p>

      <div>
        <Partner name="Supersponsors" className={styles.superSponsorsList} partners={partners.supersponsors} />
        <Partner name="Tier 2 sponsors" partners={partners.tier_2_sponsors} />
        <Partner name="Tier 3 sponsors" partners={partners.tier_3_sponsors} />
        <Partner name="Tier 4 sponsors" partners={partners.tier_4_sponsors} />
        <Partner name="Coffee sponsor" partners={partners.coffee_sponsors} />
        <Partner name="Supported by" partners={partners.supported_by} />
        <Partner name="Partners" partners={partners.partners} />
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