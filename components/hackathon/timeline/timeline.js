import styles from "./timeline.module.scss";

const Timeline = () => (
  <div>
    <div className="container">
      <div className={styles.header}>
        <p className={styles.title}>Hackathon</p>
        <p className={styles.rotate}>Timeline</p>
      </div>
      <p className={styles.tba}>TBA</p>
    </div>
  </div>
);

export default Timeline;