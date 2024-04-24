import styles from "./communityEvents.module.scss";
import Button from "../../common/button/button";

const communityEvents = () => (
  <div className="container">
    <div className={styles.header}>
      <p className={styles.title}>Upcoming Events</p>
    </div>
    <div className={styles.eventsContainer}>
      <iframe
        src="https://lu.ma/embed/calendar/cal-ejRguMIJQAKBPi5/events"
        width="600"
        height="450"
        frameBorder="0"
        style={{border: "1px solid #bfcbda88", borderRadius: "4px"}}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      />
    </div>
    <div className={styles.eventsContainer}>
      <a href="https://lu.ma/ethbelgrade" target="_blank" rel="noreferrer noopener">
        <Button className={styles.button}>
          View Luma Calendar page
        </Button>
      </a>
    </div>
  </div>
);

export default communityEvents;