import styles from "./speakers.module.scss";
import Button from "../../common/button/button";

const Speakers = () => (
  <div>
    <div className="container">
      <div className={styles.header}>
        <div className={styles.text}>
          <p className={styles.title}>The brightest Web3 minds</p>
          <p className={styles.subtitle}>have something to say</p>
        </div>
        <div>
          <a href="https://forms.gle/Xf3wV3qp5Jq7oM1W9" target="_blank" rel="noreferrer noopener">
            <Button>Apply as a speaker</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Speakers;