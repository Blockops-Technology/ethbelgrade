import styles from "./agenda.module.scss";

const Agenda = () => (
  <div>
    <div className="container">
      <div className={styles.header}>
        <p className={styles.title}>Hackathon</p>
        <p className={styles.rotate}>Agenda</p>
      </div>
      <img className={styles.image} src="/images/hackathon/hackathon-agenda.jpeg" alt="Agenda" />
    </div>
  </div>
);

export default Agenda;