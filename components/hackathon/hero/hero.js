import styles from "./hero.module.scss";
import Button from "../../common/button/button";
import {
  HACKATHON_APPLICATION_FORM_URL, MENTOR_APPLICATION_FORM_URL, DISCORD_URL
} from "../../../constants";

const Hero = () => (
  <div className={styles.hero}>
    <div className={`${styles.relative} container`}>
      <div className={styles.heroContent}>
        <p className={styles.title}>ETH Belgrade Hackathon</p>
        <div className={styles.subtitle}>
          <p>31 May - 2 June, 2024</p>
          <p>Participate IRL from Belgrade or online from all over the world.</p>
        </div>
        {/*<div className={styles.labelContainer}>*/}
        {/*  <img className={styles.sticker} src="/images/hero-sticker.svg" alt="ETH Belgrade conference sticker" />*/}
        {/*</div>*/}

        <div className={styles.buttons}>
          <a href={HACKATHON_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button styleType="blue">
              Apply to hack
            </Button>
          </a>
          <a href={MENTOR_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button styleType="blue">
                Apply to mentor
            </Button>
          </a>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer noopener">
            <Button>Join Discord</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
