import styles from "./hero.module.scss";
import Navigation from "../../common/navigation/navigation";
import Button from "../../common/button/button";

const Hero = () => (
  <div className={styles.hero}>
    <Navigation />
    <div className="container">
      <div className={styles.heroContent}>
        <p className={styles.title}>The confluence of knowledge</p>
        <div className={styles.labelContainer}>
          <img className={styles.sticker} src="/images/hero-sticker.svg" alt="ETH Belgrade conference sticker" />
          <img className={styles.label} src="/images/hero-label.png" alt="ETH Belgrade conference label" />
        </div>
      </div>
      <div className={styles.buttons}>
        <a href="https://forms.gle/89GkWspMwfCoNyqj9" target="_blank" rel="noreferrer noopener">
          <Button ghost>
            Become a partner
          </Button>
        </a>
        <a href="https://forms.gle/Xf3wV3qp5Jq7oM1W9" target="_blank" rel="noreferrer noopener">
          <Button ghost>
              Apply as a speaker
          </Button>
        </a>
        <a href="https://xntkpyvzukn.typeform.com/to/FvwgCUus" target="_blank" rel="noreferrer noopener">
          <Button>Join the waitlist</Button>
        </a>
        <a href="https://forms.gle/JN8jHHGT5KRmAbZz8" target="_blank" rel="noreferrer noopener">
          <Button ghost>
            Apply to hack
          </Button>
        </a>
      </div>
    </div>
  </div>
);

export default Hero;