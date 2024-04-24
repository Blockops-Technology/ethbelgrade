import styles from "./venue.module.scss";
import Button from "../../common/button/button";

const Venue = () => (
  <div id="venue" className={styles.venue}>
    <div className={styles.heroImage} />
    <div className={styles.pageTitleContainer}>
      <div className={styles.pageTitleWrapper}>
        <p className={styles.pageTitle}>2024 Venue</p>
        <p className={styles.subtitle}>MTS Dvorana</p>
      </div>
    </div>
    <div className="container">
      <div className={styles.pullRight}>
        <div className={styles.text}>
          <p>The historic Trade Union Hall building. Originally built in the 1950, it hosted everything
            from chess championships to music and film festivals. After the most-recent renovation, it serves as a multiplex,
            gallery, and event center. </p>
        </div>
        <div>
          <a href="https://goo.gl/maps/5errnhEko9BNP4Fs8" target="_blank" rel="noreferrer">
            <Button styleType="pinkish">Open with Google Maps</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Venue;
