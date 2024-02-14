import styles from "./hero.module.scss";
import Navigation from "../../common/navigation/navigation";
import Button from "../../common/button/button";
import { HACKATHON_APPLICATION_FORM_URL } from "../../../constants";

const Hero = () => (
  <div className={styles.hero}>
    <Navigation />
    <div className="container">
      <div className={styles.heroContent}>
        <div className={styles.labelContainer}>
          <img className={styles.sticker} src="/images/hackathon/hero-sticker.svg" alt="ETH Belgrade hackathon sticker" />
          <img className={styles.label} src="/images/hackathon/hero-label.png" alt="ETH Belgrade hackathonx label" />
          <p className={styles.date}>31 May - 2 June, 2024</p>
        </div>
      </div>
      <div className={styles.buttons}>
       <a href={HACKATHON_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
         <Button ghost>
           Apply to hack
         </Button>
       </a>
       {/* <a href="https://form.typeform.com/to/nese2ESV" target="_blank" rel="noreferrer noopener">
         <Button ghost>
           Apply to mentor
         </Button>
       </a>
       <a href="https://form.typeform.com/to/SwUgSexI" target="_blank" rel="noreferrer noopener">
         <Button ghost>
           Apply to judge
         </Button>
       </a> */}
       <a href="https://discord.gg/jQvtXAFHmS" target="_blank" rel="noreferrer noopener">
         <Button ghost>Join Discord</Button>
       </a>
      </div>
    </div>
  </div>
);

export default Hero;