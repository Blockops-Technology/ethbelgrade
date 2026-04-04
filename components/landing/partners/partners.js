import styles from "./partners.module.scss";
import Button from "../../common/button/button";
import { SPONSOR_APPLICATION_FORM_URL, YEAR } from "../../../constants";

const Partners = ({ sponsors = [] }) => (
  <div id="partners">
    <div className={styles.pageTitleContainer}>
      <div className={styles.pageTitleWrapper}>
        <p className={styles.pageTitle}>Sponsors</p>
        {/* <p className={styles.pageSubtitle}></p> */}
      </div>

    </div>
    <div className="container">
      <p className={styles.title}>They&apos;ve helped us BIG TIME!</p>
      <p className={styles.subtitle}>Shout out to key industry players for supporting previous editions of ETH Belgrade!</p>

      <div className={styles.grid}>
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.link}
            className={styles.gridCell}
            href={sponsor.link}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={sponsor.image} alt={sponsor.alt} />
          </a>
        ))}
      </div>

      <div className={styles.ctaSection}>
        <p className={styles.ctaTitle}>Consider becoming a <span>sponsor</span>?</p>
        <div className={styles.buttonWrapper}>
          <a href={SPONSOR_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button className={styles.button} styleType="red">Get in touch</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Partners;
