import styles from "./partners.module.scss";
import Button from "../../common/button/button";

const Partners = () => (
  <div id="partners" className={styles.partners}>
    <div className="container">
      <div className={styles.content}>
        <div className={styles.sponsors}>
          <p className={styles.title}>They’ve helped us BIG TIME!</p>
          <p>Shout out to key industry players for supporting this year’s ETH Belgrade!</p>
          <div className={styles.sponsorsList}>
            <a href="https://tenderly.co/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/tenderly.svg" alt="Tenderly logo" />
            </a>
            <a href="https://defisaver.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/defi-saver.png" alt="DeFi Saver logo" />
            </a>
            <a href="https://renfter.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/renfter-logo.svg" alt="Renfter logo" />
            </a>
            <a href="https://unusualsour.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/Unusual-Sour-Logo.png" alt="Unusual Sour logo" />
            </a>
            <a href="https://mvpworkshop.co/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/mvp-logo.png" alt="MVP Workshop logo" />
            </a>
            <a href="https://blockops.technology/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/blockops-logo.png" alt="Blockops logo" />
            </a>
            <a href="https://walk.rs/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/walk-logo.png" alt="WALK logo" />
            </a>
            <a href="https://www.decenter.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/decenter.svg" alt="Decenter logo" />
            </a>
            <a href="https://taikai.network/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/taikai.svg" alt="TAIKAI logo" />
            </a>
          </div>
        </div>
        {/* TODO: Comment oput when ready */}

        {/*  <p className={styles.tier}>Top Tier</p>*/}
        {/*  <div className={styles.sponsorsList}>*/}
        {/*    <a href="https://tenderly.co/" target="_blank" rel="noreferrer noopener">*/}
        {/*      <img src="/images/partners/tenderly.svg" alt="Tenderly logo" />*/}
        {/*    </a>*/}
        {/*    <a href="https://defisaver.com/" target="_blank" rel="noreferrer noopener">*/}
        {/*      <img src="/images/partners/defi-saver.png" alt="DeFi Saver logo" />*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*  /!*<p className={styles.tierAlt}>Tier 2</p>*!/*/}
        {/*  /!*<div className={styles.sponsorsList}>*!/*/}
        {/*  /!*</div>*!/*/}
        {/*  /!*<p className={styles.tier}>Tier 3</p>*!/*/}
        {/*  /!*<div className={styles.sponsorsList}>*!/*/}
        {/*  /!*</div>*!/*/}
        {/*  <p className={styles.tierAlt}>Bronze Tier</p>*/}
        {/*  <div className={styles.sponsorsList}>*/}
        {/*    <a href="https://taikai.network/" target="_blank" rel="noreferrer noopener">*/}
        {/*      <img src="/images/partners/taikai.svg" alt="TAIKAI logo" />*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*  <p className={styles.tier}>Co-organizers</p>*/}
        {/*  <div className={styles.sponsorsList}>*/}
        {/*    <a href="https://renfter.com/" target="_blank" rel="noreferrer noopener">*/}
        {/*      <img src="/images/partners/renfter-logo.svg" alt="Renfter logo" />*/}
        {/*    </a>*/}
        {/*    <a href="https://www.decenter.com/" target="_blank" rel="noreferrer noopener">*/}
        {/*      <img src="/images/partners/decenter.svg" alt="Decenter logo" />*/}
        {/*    </a>*/}
        {/*    <a href="https://tenderly.co/" target="_blank" rel="noreferrer noopener">*/}
        {/*      <img src="/images/partners/tenderly.svg" alt="Tenderly logo" />*/}
        {/*    </a>*/}
        {/*    <a href="https://unusualsour.com/" target="_blank" rel="noreferrer noopener">*/}
        {/*      <img src="/images/partners/Unusual-Sour-Logo.png" alt="Unusual Sour logo" />*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*  <p className={styles.tierAlt}>Frens</p>*/}
        {/*  <div className={styles.sponsorsList}>*/}
        {/*    <a href="https://mvpworkshop.co/" target="_blank" rel="noreferrer noopener">*/}
        {/*      <img src="/images/partners/mvp-logo.png" alt="MVP Workshop logo" />*/}
        {/*    </a>*/}
        {/*    <a href="https://walk.rs/" target="_blank" rel="noreferrer noopener">*/}
        {/*      <img src="/images/partners/walk-logo.png" alt="WALK logo" />*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className={styles.ctaSection}>
          <p className={styles.ctaTitle}>Consider becoming a partner?</p>
          <a href="https://forms.gle/89GkWspMwfCoNyqj9" target="_blank" rel="noreferrer noopener">
            <Button>Get in touch</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Partners;