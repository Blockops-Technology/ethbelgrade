import styles from "./hero.module.scss";
import Button from "../../common/button/button";
import { SPEAKER_APPLICATION_FORM_URL, SPONSOR_APPLICATION_FORM_URL, TICKETING_PLATFORM_URL } from "../../../constants";

const Hero = () => (
  <div className={styles.hero}>
    <div className={`${styles.relative} container`}>
      <div className={styles.heroContent}>
        <p className={styles.title}>MOST WELCOMING CONFERENCE</p>
        <div className={styles.subtitle}>
          <p>ETH event in the heart of the Balkans.</p>
          <p>Part of Belgrade Blockchain Week.</p>
        </div>
        {/*<div className={styles.labelContainer}>*/}
          <img className={styles.sticker} src="/images/hero-sticker.svg" alt="ETH Belgrade conference sticker" />
        {/*</div>*/}

        <div className={styles.buttons}>
          <a href={SPONSOR_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button styleType="blue">
              Become a sponsor
            </Button>
          </a>
          <a href={SPEAKER_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button styleType="blue">
                Apply as a speaker
            </Button>
          </a>
          <a href={TICKETING_PLATFORM_URL} target="_blank" rel="noreferrer noopener">
            <Button>Get Tickets</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
