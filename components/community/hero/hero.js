import styles from "./hero.module.scss";
import Button from "../../common/button/button";
import {
  MEETUP_SPEAKER_FORM_URL,
} from "../../../constants";

const Hero = () => (
  <div className={styles.hero}>
    <div className={`${styles.relative} container`}>
      <div className={styles.heroContent}>
        <p className={styles.title}>ETH Belgrade all year long</p>
        <div className={styles.subtitle}>
          <p>Monthly meetups and events.</p>
        </div>
        {/*<div className={styles.labelContainer}>*/}
        {/*  <img className={styles.sticker} src="/images/hero2-sticker.svg" alt="ETH Belgrade conference sticker" />*/}
        {/*</div>*/}

        <div className={styles.buttons}>
          <a href="mailto:petar@ethbelgrade.rs" target="_blank" rel="noreferrer noopener">
            <Button styleType="blue">
              Become a sponsor
            </Button>
          </a>
          <a href={MEETUP_SPEAKER_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button styleType="blue">
              Apply as a speaker
            </Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
