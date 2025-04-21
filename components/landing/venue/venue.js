import styles from "./venue.module.scss";
import Button from "../../common/button/button";
import { YEAR } from "../../../constants";

const Venue = () => (
  <div id="venue" className={styles.venue}>
    <div className={styles.heroImage} />
    <div className={styles.pageTitleContainer}>
      <div className={styles.pageTitleWrapper}>
        <p className={styles.pageTitle}>{YEAR} Venue</p>
        <p className={styles.subtitle}>Sava Congress Center</p>
      </div>
    </div>
    <div className="container">
      <div className={styles.pullRight}>
        <div className={styles.text}>
          <p>The historic brutalist masterpiece and one of the biggest congress centers in Europe. Originally built in the 1976, it hosted everything
            from chess championships to music and film festivals. After the most-recent renovation, it serves as an innovation,
            business, and congress center. </p>
        </div>
        <div>
          <a href="https://maps.app.goo.gl/SKcXfjnr5Fc93CW56" target="_blank" rel="noreferrer">
            <Button className={styles.button} styleType="pinkish">Open with Google Maps <img src="/icons/arrow-right.svg" alt="Arrow right direction icon" /></Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Venue;
