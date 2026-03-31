import { useTimer } from "react-timer-hook";
import { DISCOUNT } from "../../../constants";
import styles from "./banner.module.scss";

const Banner = () => {
  const {
    minutes,
    hours,
    days,
    seconds,
    isRunning,
  } = useTimer({ expiryTimestamp: new Date('3 June 2025 10:00:00 GMT+0200 (Central European Summer Time)'), onExpire: () => console.warn('onExpire called') });


  return (
    <div className={styles.banner}>
      <div className="container">
        <div className={styles.content}>
          <div className={`${styles.textWrapper} py-5`}>
            {/* <p className={styles.text}>Welcome to ETH Belgrade</p> */}
            <p className={styles.text}>Tickets for day 2 and 3 are now available. Get them on 40% discount!</p>
            {/* <p className={styles.text}>ETH Belgrade starts in</p> */}
            {/* <p className={styles.text}>Ticket sale ({DISCOUNT} off) available for</p> */}
            {/* <p className={styles.time}>{days} days  {hours} hours  {minutes} minutes {seconds} seconds</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;