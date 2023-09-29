import styles from "./hero.module.scss";
import Navigation from "../../common/navigation/navigation";
import Button from "../../common/button/button";

const Hero = () => (
  <div className={styles.hero}>
    <Navigation />
    <div className="container">
      <div className={styles.heroContent}>
        <h1 className={styles.title}>ETH Belgrade monthly meetups and events</h1>
        <div className={styles.labelContainer}>
          <img className={styles.sticker} src="/images/community/eth-bgd-sticker-pink.svg" alt="ETH Belgrade conference sticker" />
          <img className={styles.label} src="/images/community/community-hero-label.png" alt="ETH Belgrade conference label" />
        </div>
      </div>

      <div className={styles.buttons}>
        <a href="mailto:partnerships@ethbelgrade.rs" target="_blank" rel="noreferrer noopener">
          <Button ghost>
            Become a sponsor
          </Button>
        </a>
        <a href="mailto:hello@ethbelgrade.rs" target="_blank" rel="noreferrer noopener">
          <Button ghost>
              Apply as a speaker
          </Button>
        </a>

      {/*<p className={styles.subtitle}>Tickets are still available! 60% off</p>*/}
      {/*  <a href="https://app.moongate.id/events/ethbelgrade" target="_blank" rel="noreferrer noopener">*/}
      {/*    <Button>Get Tickets</Button>*/}
      {/*  </a>*/}

      {/*  /!*<a href="https://taikai.network/ethbelgrade/hackathons/hackathon-2023" target="_blank" rel="noreferrer noopener">*!/*/}
      {/*  /!*  <Button ghost>*!/*/}
      {/*  /!*    Apply to hack*!/*/}
      {/*  /!*  </Button>*!/*/}
      {/*  /!*</a>*!/*/}
      {/*</div>*/}

      {/*<div className={styles.mapWrapper}>*/}
      {/*  <a href="/images/GROUND.png">*/}
      {/*    <img src="/images/GROUND.png" alt="ground floor map" />*/}
      {/*  </a>*/}
      {/*  <a href="/images/UPPER.png">*/}
      {/*    <img src="/images/UPPER.png" alt="upper floor map" />*/}
      {/*  </a>*/}
      </div>
    </div>
  </div>
);

export default Hero;
