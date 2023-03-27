import styles from "./mentorsAndJudges.module.scss";

const MentorsAndJudges = () => (
  <div className={styles.mjWrapper}>
    <div className="container">
      <div className={styles.mentors}>
        <p className={styles.mentorsTitle}>Mentors</p>
        <p className={styles.tba}>TBA</p>
      </div>
      <div>
        <p className={styles.judgesTitle}>Judges</p>
        <p className={styles.tba}>TBA</p>
      </div>
    </div>
  </div>
);

export default MentorsAndJudges;