import styles from "./hero.module.scss";
import Button from "../../common/button/button";
import {
  HACKATHON_APPLICATION_FORM_URL, MENTOR_APPLICATION_FORM_URL, JUDGE_APPLICATION_FORM_URL, DISCORD_URL, HACKATHON_DATE
} from "../../../constants";

const Hero = () => (
  <div className={styles.hero}>
    <div className={`${styles.relative} container`}>
      <div className={styles.heroContent}>
        <p className={styles.title}>ETH Belgrade Hackathon</p>
        <p className={styles.dates}>{HACKATHON_DATE}, 2025</p>
        <div className={styles.subtitle}>
          <p>Participate IRL from Belgrade or online from all over the world.</p>
        </div>

        <div className={styles.buttons}>
          {/* <a href={HACKATHON_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button>
              Apply to hack
            </Button>
          </a>
          <a href={MENTOR_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button styleType="blue">
              Apply to mentor
            </Button>
          </a>
          <a href={JUDGE_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button styleType="blue">
              Apply to judge
            </Button>
          </a>
          <a href="/hackathonagenda" target="_blank" rel="noreferrer noopener">
            <Button styleType="blue">
              Workshop Agenda
            </Button>
          </a> */}
          {/*<a href={DISCORD_URL} target="_blank" rel="noreferrer noopener">*/}
          {/*  <Button>Join Discord</Button>*/}
          {/*</a>*/}
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
