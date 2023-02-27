import styles from "./mediaPartners.module.scss";
import Button from "../../common/button/button";

const MediaPartners = () => (
  <div className={styles.mediaPartners}>
    <div className="container">
      <div className={styles.header}>
        <p className={styles.title}>Thanks for spreading the word</p>
        <a href="#" target="_blank" rel="noreferrer noopener">
          <Button>Become a media partner</Button>
        </a>
      </div>
    </div>
  </div>
);

export default MediaPartners;