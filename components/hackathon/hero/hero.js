import styles from "./hero.module.scss";
import Navigation from "../../common/navigation/navigation";
import Button from "../../common/button/button";

const Hero = () => (
  <div className={styles.hero}>
    <Navigation />
    <div className="container">
      <div className={styles.heroContent}>
        <div className={styles.labelContainer}>
          <img className={styles.sticker} src="/images/hackathon/hero-sticker.svg" alt="ETH Belgrade hackathon sticker" />
          <img className={styles.label} src="/images/hackathon/hero-label.png" alt="ETH Belgrade hackathonx label" />
        </div>
      </div>
      <div className={styles.buttons}>
        <a href="https://forms.gle/JN8jHHGT5KRmAbZz8" target="_blank" rel="noreferrer noopener">
          <Button ghost>
            Apply to hack
          </Button>
        </a>
        <a href="" target="_blank" rel="noreferrer noopener">
          <Button ghost>
            Apply to mentor
          </Button>
        </a>
        <a href="" target="_blank" rel="noreferrer noopener">
          <Button ghost>
            Apply to judge
          </Button>
        </a>
        <a href="https://discord.gg/9HNGHFF7" target="_blank" rel="noreferrer noopener">
          <Button ghost>Join Discord</Button>
        </a>
      </div>
    </div>
  </div>
);

export default Hero;