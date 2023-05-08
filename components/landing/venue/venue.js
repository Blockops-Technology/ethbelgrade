import styles from "./venue.module.scss";
import Button from "../../common/button/button";

const Venue = () => (
  <div id="venue" className={styles.venue}>
    <div className="container">
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <p className={styles.title}>The Venue</p>
            <p className={styles.subtitle}>MTS Dvorana</p>
          </div>
          <p>Join us at the historic Trade Union Hall building. Originally built in the 1950, it hosted everything
            from chess championships to music and film festivals. After the most-recent renovation, it serves as a multiplex,
            gallery, and event center. </p>
        </div>
        <div className={styles.imgWrapper}>
          <img src="/images/venue/venue-map.png" alt="Venue map"/>
          <a href="https://goo.gl/maps/5errnhEko9BNP4Fs8" target="_blank" className={styles.venuePin} rel="noreferrer">
            <img src="/images/venue/venue-pin.png" alt="" />
          </a>
          <div className={styles.venueFlag}>
            <p className={styles.venueFlagTitle}>MTS Dvorana</p>
            <p className={styles.venueFlagAddress}>
              Dečanska 11, Beograd 11000
            </p>
            <p className={styles.venueFlagAddress}>
              <a href="https://en.wikipedia.org/wiki/Dom_Sindikata" target="_blank" rel="noreferrer">Learn more</a>
            </p>
          </div>
          {/*<img src="/images/venue/venue-flag.png" alt="" className={styles.venueFlag}/>*/}
        </div>
        <div className={styles.pullRight}>
          <a href="https://goo.gl/maps/5errnhEko9BNP4Fs8" target="_blank" rel="noreferrer">
            <Button ghost>Open with Google Maps</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Venue;
