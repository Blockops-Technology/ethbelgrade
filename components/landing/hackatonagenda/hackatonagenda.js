import styles from "./hackatonagenda.module.scss";

import agenda from "./hackatonagenda.json";

const Agenda = () => (
  <div id="agenda" className={styles.agenda}>
    <div className="container no-padding">
      <div className={styles.titleWrapper}>
        <p className={styles.title}>Hackaton Agenda</p>
      </div>
      <div className={styles.agendaContainer}>
          <div className={styles.timeTable}>
                  <div></div>
                  <div className={styles.header}>
                    <h3><span></span></h3>
                    {/* <img className="w-full !max-w-[110px]" src="/images/partners/rise-logo.png" /> */}
                    <h4>Rise stage</h4>
                  </div>
          {
            agenda.map((entry, i) => (
              <>
              <div className={styles.time}>{entry.time}</div>

              <div className={styles.details}>
                <div className={`${styles.talk}`}>
                  {entry.sponsor}
                </div>
              </div>
              </>
            ))
          }
                </div>
      </div>

    </div>
  </div>
);

export default Agenda;
