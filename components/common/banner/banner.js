import { useTimer } from "react-timer-hook";

import styles from "./banner.module.scss";
import Button from "../button/button";

const Banner = () => {
  const {
    minutes,
    hours,
    days,
    seconds,
    isRunning,
  } = useTimer({ expiryTimestamp: new Date('17 April 2023 15:00:00 GMT+0200 (Central European Summer Time)'), onExpire: () => console.warn('onExpire called') });


  return (
    <div className={styles.banner}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textWrapper}>
            <p className={styles.text}>Tickets price increasing in</p>
            <p className={styles.time}>{days} days  {hours} hours  {minutes} minutes {seconds} seconds</p>
          </div>
          <a href="https://app.moongate.id/events/ethbelgrade" target="_blank" rel="noreferrer noopener">
            <Button className={styles.button}>Get Tickets</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Banner;