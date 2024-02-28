import { useTimer } from "react-timer-hook";

import styles from "./banner.module.scss";
import Button from "../button/button";
import { TICKETING_PLATFORM_URL } from "../../../constants";

const Banner = () => {
  const {
    minutes,
    hours,
    days,
    seconds,
    isRunning,
  } = useTimer({ expiryTimestamp: new Date('1 March 2024 00:00:00 GMT+0200 (Central European Summer Time)'), onExpire: () => console.warn('onExpire called') });


  return (
    <div className={styles.banner}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textWrapper}>
            {/*<p className={styles.text}>ETH Belgrade starts in</p>*/}
            <p className={styles.text}>Super early bird tickets available for</p>
            <p className={styles.time}>{days} days  {hours} hours  {minutes} minutes {seconds} seconds</p>
          </div>
          <a href={TICKETING_PLATFORM_URL} target="_blank" rel="noreferrer noopener">
            <Button className={styles.button}>Get Tickets</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Banner;