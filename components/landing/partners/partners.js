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
            <a href="https://esp.ethereum.foundation/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/EF-ESP-logo.svg" alt="Ethereum Foundation Ecosystem Support Program logo" />
            </a>
            <a href="https://www.superchain.network/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/superchain-logo.png" alt="Superchain logo" />
            </a>
            <a href="https://blockanalitica.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/BlockAnalitica-logo.png" alt="Block Analitica logo" />
            </a>
            <a href="https://metamask.io/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/MetaMaskSnaps-logo.svg" alt="MetaMask logo" />
            </a>
            <a href="https://www.liquity.org/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/liquity-logo-white.svg" alt="Liquity logo" />
            </a>
            <a href="https://renfter.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/renfter-logo.svg" alt="Renfter logo" />
            </a>
            <a href="http://cloverlabs.io/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/clover.svg" alt="Clover logo" />
            </a>
            <a href="https://tangem.com/pricing/?promocode=BELGRADE" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/tangem-white.png" alt="Tangem logo" />
            </a>
            <a href="https://unusualsour.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/Unusual-Sour-Logo.png" alt="Unusual Sour logo" />
            </a>
            <a href="https://bloxico.com/" target="_blank" rel="noreferrer noopener">
              <img className={styles.bloxico} src="/images/partners/bloxico-logo.png" alt="Bloxico logo" />
            </a>
            <a href="https://electrocoin.hr/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/electrocoin-logo.png" alt="Electrocoin logo" />
            </a>
            <a href="https://gno.land/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/gnoland-logo.png" alt="Gno.land logo" />
            </a>
            <a href="https://streamflow.finance/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/streamflow-logo-min.svg" alt="Streamflow Finance logo" />
            </a>
            <a href="https://chainide.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/ChainIDE.svg" alt="ChainIDE logo" />
            </a>
            <a href="https://www.decenter.com/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/decenter.svg" alt="Decenter logo" />
            </a>
            <a href="https://blockops.technology/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/blockops-logo.png" alt="Blockops logo" />
            </a>
            <a href="https://layerx.xyz/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/LayerX-logo.svg" alt="LayerX logo" />
            </a>
            <a href="https://mvpworkshop.co/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/mvp-logo.png" alt="MVP Workshop logo" />
            </a>
            <a href="https://walk.rs/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/walk-logo.png" alt="WALK logo" />
            </a>
            <a href="https://moongate.id/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/moongate-logo.png" alt="Moongate logo" />
            </a>
            <a href="https://blocksplit.net/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/BlockSplit_logo.png" alt="BlockSplit logo" />
            </a>
            <a href="https://ecd.rs/en" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/ecd-logo.png" alt="ECD logo" />
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